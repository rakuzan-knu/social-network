-- CreateEnum
CREATE TYPE "CallType" AS ENUM ('AUDIO', 'VIDEO', 'SCREEN_SHARE');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('INITIATED', 'RINGING', 'CONNECTED', 'ENDED', 'MISSED', 'DECLINED', 'FAILED');

-- CreateEnum
CREATE TYPE "CallEndReason" AS ENUM ('ENDED_BY_USER', 'MISSED', 'DECLINED', 'BUSY', 'NETWORK_ERROR', 'PARTICIPANT_LEFT', 'TIMEOUT', 'SYSTEM');

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "type" "CallType" NOT NULL DEFAULT 'AUDIO',
    "status" "CallStatus" NOT NULL DEFAULT 'INITIATED',
    "initiatorId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connectedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "endedReason" "CallEndReason",
    "durationMs" INTEGER,
    "recordingUrl" TEXT,
    "e2eeEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallParticipant" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3),
    "leftAt" TIMESTAMP(3),
    "muteState" BOOLEAN NOT NULL DEFAULT false,
    "videoState" BOOLEAN NOT NULL DEFAULT true,
    "screenShare" BOOLEAN NOT NULL DEFAULT false,
    "role" "ParticipantRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CallParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Call_conversationId_startedAt_idx" ON "Call"("conversationId", "startedAt");

-- CreateIndex
CREATE INDEX "Call_initiatorId_startedAt_idx" ON "Call"("initiatorId", "startedAt");

-- CreateIndex
CREATE INDEX "Call_status_idx" ON "Call"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CallParticipant_callId_userId_key" ON "CallParticipant"("callId", "userId");

-- CreateIndex
CREATE INDEX "CallParticipant_userId_idx" ON "CallParticipant"("userId");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallParticipant" ADD CONSTRAINT "CallParticipant_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallParticipant" ADD CONSTRAINT "CallParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
