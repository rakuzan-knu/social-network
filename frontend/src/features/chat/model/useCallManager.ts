import { useEffect, useCallback, useRef } from 'react';
import { useCallStore, type IncomingCallData } from './callStore';
import { useWebRTC } from './useWebRTC';
import { useWakeLock } from './useWakeLock';
import { getSocket } from '@/shared/api/socket';
import { WS_EVENTS } from '@backend/messenger/events/ws-events';
import {
  playIncomingRingtone,
  playOutgoingRingtone,
  playCallEndSound,
  stopRingtone,
} from '../lib/callRingtone';
import { showBrowserPushNotification } from '@/shared/lib/browserPushNotifications';
import type { UserSnapshot, ZkpCallProof, WebTransportSessionResponse } from '@common/contracts';
import { ZKPIdentityManager } from '../lib/webrtc/zkpIdentity';
import { useAuthStore } from '@/shared/model/useAuthStore';
import { apiClient } from '@/shared/api/httpClient';
import { usePushToTalk } from './usePushToTalk';
import { MultiTabCallCoordinator } from '../lib/webrtc/multiTabCallCoordinator';
import { triggerHaptic, cancelHaptic } from '../lib/webrtc/hapticFeedback';

export function useCallManager() {
  const socket = getSocket();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const multiTabCoordinatorRef = useRef<MultiTabCallCoordinator | null>(null);
  const acceptCallRef = useRef<(() => Promise<void>) | null>(null);
  const rejectCallRef = useRef<((reason?: string) => void) | null>(null);
  const endCallRef = useRef<(() => void) | null>(null);
  const toggleMuteRef = useRef<(() => void) | null>(null);

  const {
    callStatus,
    callType,
    callId,
    conversationId,
    incomingCall,
    remoteParticipant,
    isMuted,
    isVideoOff,
    isScreenSharing,
    setCallStatus,
    setIncomingCall,
    clearIncomingCall,
    setActiveCall,
    setIsMuted,
    setIsVideoOff,
    incrementDuration,
    setDurationSec,
    setAvailableDevices,
    resetCall,
  } = useCallStore();

  // Screen Wake Lock API keeps device awake during call
  useWakeLock(callStatus === 'connected' || callStatus === 'calling');

  // Auto ICE-Restart sender callback
  const handleSendIceRestart = useCallback(
    (offer: RTCSessionDescriptionInit) => {
      const currentCallId = useCallStore.getState().callId;
      const currentRemote = useCallStore.getState().remoteParticipant;
      if (!currentCallId || !socket) return;
      socket.emit(WS_EVENTS.CALL_ICE_RESTART, {
        callId: currentCallId,
        sdpOffer: offer,
        targetUserId: currentRemote?.id,
      });
    },
    [socket],
  );

  const closeConnectionRef = useRef<(() => void) | null>(null);

  const handleConnectionFailed = useCallback(() => {
    const currentCallId = useCallStore.getState().callId;
    if (currentCallId && socket) {
      socket.emit(WS_EVENTS.CALL_END, {
        callId: currentCallId,
        reason: 'CONNECTION_LOST',
      });
    }
    stopRingtone();
    playCallEndSound();
    closeConnectionRef.current?.();
    resetCall();
  }, [socket, resetCall]);

  const webRTC = useWebRTC({
    onSendIceRestart: handleSendIceRestart,
    onConnectionFailed: handleConnectionFailed,
  });

  const negotiateWebTransport = useCallback(
    async (targetCallId: string) => {
      try {
        const res = await apiClient.post<WebTransportSessionResponse>(
          '/calls/webtransport-session',
          { callId: targetCallId },
        );
        if (res.data?.endpointUrl && res.data.sessionTicket && webRTC.webTransportClient) {
          await webRTC.webTransportClient.connect(res.data.endpointUrl, res.data.sessionTicket);
        }
      } catch {
        // Fallback to WebSocket transparently
      }
    },
    [webRTC.webTransportClient],
  );
  closeConnectionRef.current = webRTC.closeConnection;

  // Initialize Push-to-Talk (PTT) with software audio release tail
  const ptt = usePushToTalk({ toggleMuteTrack: webRTC.toggleMuteTrack });

  // Enumerate devices on mount
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;

    const updateDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === 'audioinput');
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        const audioOutputs = devices.filter((d) => d.kind === 'audiooutput');
        setAvailableDevices({ audioInputs, videoInputs, audioOutputs });
      } catch {
        // devices enumeration error
      }
    };

    void updateDevices();
    navigator.mediaDevices.addEventListener?.('devicechange', updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener?.('devicechange', updateDevices);
    };
  }, [setAvailableDevices]);

  // Duration timer during connected call
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        incrementDuration();
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [callStatus, incrementDuration]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleIncoming = async (data: IncomingCallData) => {
      // If we are already on an active call, auto-reject or busy
      const currentStatus = useCallStore.getState().callStatus;
      if (currentStatus !== 'idle') {
        socket.emit(WS_EVENTS.CALL_REJECT, {
          callId: data.callId,
          reason: 'MISSED',
        });
        return;
      }

      if (data.zkpProof) {
        try {
          const verifyResult = await ZKPIdentityManager.verifyProof(data.zkpProof);
          if (verifyResult.valid) {
            useCallStore.setState({ zkpProof: data.zkpProof });
          }
        } catch {
          // Ignore verification error
        }
      }

      setIncomingCall(data);

      // Multi-tab leader election and ringtone suppression
      if (data.callId) {
        if (!multiTabCoordinatorRef.current) {
          multiTabCoordinatorRef.current = new MultiTabCallCoordinator({
            onRemoteCommand: (command) => {
              if (command === 'ACCEPT') void acceptCallRef.current?.();
              else if (command === 'DECLINE') rejectCallRef.current?.('DECLINED');
              else if (command === 'END') endCallRef.current?.();
              else if (command === 'MUTE') toggleMuteRef.current?.();
            },
          });
        }
        void multiTabCoordinatorRef.current.coordinateCall(data.callId).then(() => {
          if (!multiTabCoordinatorRef.current?.shouldSuppressRingtone()) {
            multiTabCoordinatorRef.current?.announceRinging();
            playIncomingRingtone();
          }
        });
      } else {
        playIncomingRingtone();
      }
      triggerHaptic('incomingCall');

      // Background notification when tab is unfocused/hidden
      if (typeof document !== 'undefined' && document.hidden) {
        void showBrowserPushNotification({
          title: `Incoming ${data.callType === 'video' ? 'Video' : 'Voice'} Call`,
          body: `${data.caller.displayName || data.caller.username} is calling you...`,
          icon: data.caller.avatar,
          url: `/chat?conv=${data.conversationId}&callId=${data.callId}`,
          tag: `incoming-call-${data.callId}`,
        });
      }
    };

    const handleAccepted = async (data: {
      callId: string;
      accepterId: string;
      sdpAnswer?: RTCSessionDescriptionInit;
      iceCandidates?: RTCIceCandidateInit[];
    }) => {
      cancelHaptic();
      stopRingtone();
      setCallStatus('connected');
      if (data.sdpAnswer) {
        await webRTC.handleAnswer(data.sdpAnswer);
      }
      if (data.iceCandidates && Array.isArray(data.iceCandidates)) {
        for (const candidate of data.iceCandidates) {
          await webRTC.addIceCandidate(candidate);
        }
      }
      void negotiateWebTransport(data.callId);
    };

    const handleIceCandidate = async (data: {
      callId: string;
      candidate: RTCIceCandidateInit;
      senderUserId: string;
    }) => {
      if (data.candidate) {
        await webRTC.addIceCandidate(data.candidate);
      }
    };

    const handleRemoteIceRestart = async (data: {
      callId: string;
      sdpOffer: RTCSessionDescriptionInit;
      senderUserId: string;
    }) => {
      if (data.callId !== useCallStore.getState().callId) return;
      try {
        const answer = await webRTC.handleRemoteIceRestart(data.sdpOffer);
        socket.emit(WS_EVENTS.CALL_ICE_RESTART_ANSWER, {
          callId: data.callId,
          sdpAnswer: answer,
          targetUserId: data.senderUserId,
        });
      } catch (err) {
        console.warn('Handling remote ICE restart failed', err);
      }
    };

    const handleIceRestartAnswer = async (data: {
      callId: string;
      sdpAnswer: RTCSessionDescriptionInit;
    }) => {
      if (data.callId !== useCallStore.getState().callId) return;
      try {
        await webRTC.handleIceRestartAnswer(data.sdpAnswer);
      } catch (err) {
        console.warn('Applying ICE restart answer failed', err);
      }
    };

    const handleEnded = (_data: { callId: string; reason?: string; durationMs?: number }) => {
      stopRingtone();
      playCallEndSound();
      webRTC.closeConnection();
      multiTabCoordinatorRef.current?.stop();
      multiTabCoordinatorRef.current = null;
      resetCall();
    };

    const handleMute = (_data: { callId: string; userId: string; isMuted: boolean }) => {
      // Remote participant mute state updated
    };

    const handleVideoToggle = (_data: { callId: string; userId: string; isVideoOff: boolean }) => {
      // Remote participant video state updated
    };

    const handleRelayAssigned = (data: {
      callId: string;
      relaySessionId: string;
      relayUserId: string;
      isInitiator: boolean;
    }) => {
      useCallStore.getState().setIsPeerRelayActive(true, data.relaySessionId);
    };

    socket.on(WS_EVENTS.CALL_INCOMING, handleIncoming);
    socket.on(WS_EVENTS.CALL_ACCEPTED, handleAccepted);
    socket.on(WS_EVENTS.CALL_ICE_CANDIDATE, handleIceCandidate);
    socket.on(WS_EVENTS.CALL_ICE_RESTART, handleRemoteIceRestart);
    socket.on(WS_EVENTS.CALL_ICE_RESTART_ANSWER, handleIceRestartAnswer);
    socket.on(WS_EVENTS.CALL_ENDED, handleEnded);
    socket.on(WS_EVENTS.CALL_MUTE, handleMute);
    socket.on(WS_EVENTS.CALL_VIDEO_TOGGLE, handleVideoToggle);
    socket.on(WS_EVENTS.CALL_RELAY_ASSIGNED, handleRelayAssigned);

    return () => {
      socket.off(WS_EVENTS.CALL_INCOMING, handleIncoming);
      socket.off(WS_EVENTS.CALL_ACCEPTED, handleAccepted);
      socket.off(WS_EVENTS.CALL_ICE_CANDIDATE, handleIceCandidate);
      socket.off(WS_EVENTS.CALL_ICE_RESTART, handleRemoteIceRestart);
      socket.off(WS_EVENTS.CALL_ICE_RESTART_ANSWER, handleIceRestartAnswer);
      socket.off(WS_EVENTS.CALL_ENDED, handleEnded);
      socket.off(WS_EVENTS.CALL_MUTE, handleMute);
      socket.off(WS_EVENTS.CALL_VIDEO_TOGGLE, handleVideoToggle);
      socket.off(WS_EVENTS.CALL_RELAY_ASSIGNED, handleRelayAssigned);
    };
  }, [socket, webRTC, setIncomingCall, setCallStatus, resetCall, negotiateWebTransport]);

  const initiateCall = useCallback(
    async (params: {
      conversationId: string;
      callType: 'audio' | 'video';
      remoteUser: UserSnapshot;
    }) => {
      try {
        setDurationSec(0);
        setCallStatus('calling');
        useCallStore.setState({
          callType: params.callType,
          conversationId: params.conversationId,
          remoteParticipant: params.remoteUser,
        });

        playOutgoingRingtone();

        const gatheredCandidates: RTCIceCandidateInit[] = [];
        const offer = await webRTC.createOffer(
          params.callType,
          (candidate) => {
            const currentCallId = useCallStore.getState().callId;
            if (currentCallId) {
              socket.emit(WS_EVENTS.CALL_ICE_CANDIDATE, {
                callId: currentCallId,
                candidate: candidate.toJSON(),
                targetUserId: params.remoteUser.id,
              });
            } else {
              gatheredCandidates.push(candidate.toJSON());
            }
          },
          params.remoteUser.id,
        );

        const { isGhostMode } = useCallStore.getState();
        let zkpProof: ZkpCallProof | null = null;
        if (isGhostMode) {
          const currentUserId = useAuthStore.getState().userId;
          if (currentUserId) {
            const cred = await ZKPIdentityManager.deriveCredential(currentUserId);
            zkpProof = await ZKPIdentityManager.generateProof(cred, 20);
            useCallStore.setState({ zkpProof });
          }
        }

        socket.emit(
          WS_EVENTS.CALL_INITIATE,
          {
            conversationId: params.conversationId,
            callType: params.callType.toUpperCase(),
            sdpOffer: offer,
            iceCandidates: gatheredCandidates,
            ...(zkpProof ? { zkpProof, isGhostMode: true } : {}),
          },
          (res: { status: string; callId?: string; call?: any; error?: string }) => {
            if (res?.status === 'ok' && res.callId) {
              useCallStore.setState({ callId: res.callId });
              if (res.call) {
                setActiveCall(res.call, params.remoteUser);
              }
              void negotiateWebTransport(res.callId);
            } else {
              stopRingtone();
              playCallEndSound();
              webRTC.closeConnection();
              resetCall();
            }
          },
        );
      } catch {
        stopRingtone();
        playCallEndSound();
        webRTC.closeConnection();
        resetCall();
      }
    },
    [
      socket,
      webRTC,
      setDurationSec,
      setCallStatus,
      setActiveCall,
      resetCall,
      negotiateWebTransport,
    ],
  );

  const acceptCall = useCallback(async () => {
    if (multiTabCoordinatorRef.current && !multiTabCoordinatorRef.current.isLeader()) {
      multiTabCoordinatorRef.current.sendSlaveAction('ACCEPT');
      return;
    }

    const currentIncoming = useCallStore.getState().incomingCall;
    if (!currentIncoming) return;

    stopRingtone();
    clearIncomingCall();
    setDurationSec(0);
    setCallStatus('connected');
    useCallStore.setState({
      callId: currentIncoming.callId,
      conversationId: currentIncoming.conversationId,
      callType: currentIncoming.callType,
      remoteParticipant: currentIncoming.caller,
    });

    try {
      const gatheredCandidates: RTCIceCandidateInit[] = [];
      const answer = await webRTC.handleOffer(
        currentIncoming.sdpOffer as RTCSessionDescriptionInit,
        currentIncoming.callType,
        (candidate) => {
          socket.emit(WS_EVENTS.CALL_ICE_CANDIDATE, {
            callId: currentIncoming.callId,
            candidate: candidate.toJSON(),
            targetUserId: currentIncoming.callerId,
          });
        },
        currentIncoming.callerId,
      );

      // Process any candidates attached to the incoming call payload
      if (currentIncoming.iceCandidates && Array.isArray(currentIncoming.iceCandidates)) {
        for (const cand of currentIncoming.iceCandidates) {
          await webRTC.addIceCandidate(cand as RTCIceCandidateInit);
        }
      }

      socket.emit(
        WS_EVENTS.CALL_ACCEPT,
        {
          callId: currentIncoming.callId,
          sdpAnswer: answer,
          iceCandidates: gatheredCandidates,
        },
        (res: { status: string; call?: any }) => {
          if (res?.call) {
            setActiveCall(res.call, currentIncoming.caller);
          }
          void negotiateWebTransport(currentIncoming.callId);
        },
      );
    } catch {
      playCallEndSound();
      webRTC.closeConnection();
      resetCall();
    }
  }, [
    socket,
    webRTC,
    clearIncomingCall,
    setDurationSec,
    setCallStatus,
    setActiveCall,
    resetCall,
    negotiateWebTransport,
  ]);

  const rejectCall = useCallback(
    (reason = 'DECLINED') => {
      if (multiTabCoordinatorRef.current && !multiTabCoordinatorRef.current.isLeader()) {
        multiTabCoordinatorRef.current.sendSlaveAction('DECLINE');
        return;
      }

      const currentIncoming = useCallStore.getState().incomingCall;
      stopRingtone();
      clearIncomingCall();
      if (currentIncoming) {
        socket.emit(WS_EVENTS.CALL_REJECT, {
          callId: currentIncoming.callId,
          reason,
        });
      }
      multiTabCoordinatorRef.current?.stop();
      multiTabCoordinatorRef.current = null;
      resetCall();
    },
    [socket, clearIncomingCall, resetCall],
  );

  // Listen to Service Worker Push Notification Action Buttons (Accept / Decline)
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel('eternal_calls');

    channel.onmessage = (event) => {
      const msg = event.data;
      if (!msg) return;
      if (msg.type === 'CALL_ACCEPTED_FROM_PUSH') {
        void acceptCall();
      } else if (msg.type === 'CALL_DECLINED_FROM_PUSH') {
        rejectCall('DECLINED');
      }
    };

    return () => {
      channel.close();
    };
  }, [acceptCall, rejectCall]);

  const endCall = useCallback(() => {
    if (multiTabCoordinatorRef.current && !multiTabCoordinatorRef.current.isLeader()) {
      multiTabCoordinatorRef.current.sendSlaveAction('END');
      return;
    }

    const currentCallId = useCallStore.getState().callId;
    const durationSec = useCallStore.getState().durationSec;

    stopRingtone();
    playCallEndSound();
    cancelHaptic();
    triggerHaptic('callEnded');

    if (currentCallId) {
      socket.emit(WS_EVENTS.CALL_END, {
        callId: currentCallId,
        reason: 'ENDED_BY_USER',
        durationMs: durationSec * 1000,
      });
    }

    webRTC.closeConnection();
    multiTabCoordinatorRef.current?.stop();
    multiTabCoordinatorRef.current = null;
    resetCall();
  }, [socket, webRTC, resetCall]);

  const toggleMute = useCallback(() => {
    const currentCallId = useCallStore.getState().callId;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    webRTC.toggleMuteTrack(newMuted);
    triggerHaptic(newMuted ? 'mute' : 'unmute');

    if (currentCallId) {
      socket.emit(newMuted ? WS_EVENTS.CALL_MUTE : WS_EVENTS.CALL_UNMUTE, {
        callId: currentCallId,
        isMuted: newMuted,
      });
    }
  }, [socket, webRTC, isMuted, setIsMuted]);

  const toggleVideo = useCallback(() => {
    const currentCallId = useCallStore.getState().callId;
    const newVideoOff = !isVideoOff;
    setIsVideoOff(newVideoOff);
    webRTC.toggleVideoTrack(newVideoOff);
    triggerHaptic('cameraToggle');

    if (currentCallId) {
      socket.emit(WS_EVENTS.CALL_VIDEO_TOGGLE, {
        callId: currentCallId,
        isVideoOff: newVideoOff,
      });
    }
  }, [socket, webRTC, isVideoOff, setIsVideoOff]);

  const toggleScreenShare = useCallback(async () => {
    const currentCallId = useCallStore.getState().callId;
    triggerHaptic('screenShare');
    if (isScreenSharing) {
      await webRTC.stopScreenShare();
      if (currentCallId) {
        socket.emit(WS_EVENTS.CALL_SCREEN_SHARE_STOP, {
          callId: currentCallId,
          isSharing: false,
        });
      }
    } else {
      try {
        await webRTC.startScreenShare();
        if (currentCallId) {
          socket.emit(WS_EVENTS.CALL_SCREEN_SHARE_START, {
            callId: currentCallId,
            isSharing: true,
          });
        }
      } catch {
        // User cancelled screen share picker
      }
    }
  }, [socket, webRTC, isScreenSharing]);

  acceptCallRef.current = acceptCall;
  rejectCallRef.current = rejectCall;
  endCallRef.current = endCall;
  toggleMuteRef.current = toggleMute;

  return {
    callStatus,
    callType,
    callId,
    conversationId,
    incomingCall,
    remoteParticipant,
    isMuted,
    isVideoOff,
    isScreenSharing,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    sendP2PFile: webRTC.sendP2PFile,
    cancelP2PTransfer: webRTC.cancelP2PTransfer,
    registerVideoTile: webRTC.registerVideoTile,
    unregisterVideoTile: webRTC.unregisterVideoTile,
    syncPlayEngine: webRTC.syncPlayEngine,
    whiteboardEngine: webRTC.whiteboardEngine,
    superResEngine: webRTC.superResEngine,
    webCodecsManager: webRTC.webCodecsManager,
    peerRelayManager: webRTC.peerRelayManager,
    chaosEngine: webRTC.chaosEngine,
    unblockAutoplay: webRTC.unblockAutoplay,
    registerMediaElement: webRTC.registerMediaElement,
    reactionEngine: webRTC.reactionEngine,
    sendReaction: webRTC.sendReaction,
    ptt,
    multiTabCoordinator: multiTabCoordinatorRef.current,
    configureSVC: webRTC.configureSVC,
    switchSVCMode: webRTC.switchSVCMode,
    setSVCLayers: webRTC.setSVCLayers,
    callExternalStore: webRTC.callExternalStore,
  };
}
