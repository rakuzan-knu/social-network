import { useEffect } from 'react';
import { useChatSocket } from './useChatSocket';
import { usePresenceStore } from '@/shared/model/usePresenceStore';

export function usePresenceSync() {
  const socket = useChatSocket();
  const setOnline = usePresenceStore((s) => s.setOnline);
  const setOffline = usePresenceStore((s) => s.setOffline);
  const applyBatch = usePresenceStore((s) => s.applyBatch);

  useEffect(() => {
    const handleOnline = ({ userId }: { userId: string }) => setOnline(userId);
    const handleOffline = ({ userId }: { userId: string }) => setOffline(userId);
    const handleBatch = ({
      online = [],
      offline = [],
    }: {
      online?: string[];
      offline?: string[];
    }) => applyBatch(online, offline);

    socket.on('userOnline', handleOnline);
    socket.on('userOffline', handleOffline);
    socket.on('presence:batch', handleBatch);

    return () => {
      socket.off('userOnline', handleOnline);
      socket.off('userOffline', handleOffline);
      socket.off('presence:batch', handleBatch);
    };
  }, [socket, setOnline, setOffline, applyBatch]);
}

export function useQueryOnlineStatus(userIds: string[]) {
  const socket = useChatSocket();
  const setKnownStatuses = usePresenceStore((s) => s.setKnownStatuses);
  const key = userIds.slice().sort().join(',');

  useEffect(() => {
    if (!key) return;
    const requestedIds = key.split(',');
    socket.emit(
      'getOnlineStatus',
      { userIds: requestedIds },
      (res: { status: string; online?: string[] }) => {
        if (res?.status === 'ok' && res.online) setKnownStatuses(requestedIds, res.online);
      },
    );
  }, [key, socket, setKnownStatuses]);
}
