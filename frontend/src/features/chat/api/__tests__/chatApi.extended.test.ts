import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chatApi } from '../chatApi';
import { apiClient as api } from '@/shared/api/httpClient';

describe('chatApi (Extended Endpoints Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls getConversations and getConversation', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [{ id: 'conv-1' }] });
    const convs = await chatApi.getConversations();
    expect(convs).toEqual([{ id: 'conv-1' }]);
    expect(api.get).toHaveBeenCalledWith('/conversations');

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: { id: 'conv-1' } });
    const single = await chatApi.getConversation('conv-1');
    expect(single).toEqual({ id: 'conv-1' });
    expect(api.get).toHaveBeenCalledWith('/conversations/conv-1');
  });

  it('creates direct and group conversations', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { id: 'conv-direct-1' } });
    const direct = await chatApi.createDirectConversation('user-2');
    expect(direct).toEqual({ id: 'conv-direct-1' });
    expect(api.post).toHaveBeenCalledWith('/conversations/direct', { participantId: 'user-2' });

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { id: 'conv-group-1' } });
    const group = await chatApi.createGroupConversation('Team Alpha', ['u-1', 'u-2'], 'Main team');
    expect(group).toEqual({ id: 'conv-group-1' });
    expect(api.post).toHaveBeenCalledWith('/conversations/group', {
      name: 'Team Alpha',
      memberIds: ['u-1', 'u-2'],
      description: 'Main team',
    });
  });

  it('handles group member management and permissions', async () => {
    vi.spyOn(api, 'patch').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.updateGroup('conv-1', { name: 'New Name' });
    expect(api.patch).toHaveBeenCalledWith('/conversations/conv-1/group', { name: 'New Name' });

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.addMembers('conv-1', ['u-3', 'u-4']);
    expect(api.post).toHaveBeenCalledWith('/conversations/conv-1/members', {
      memberIds: ['u-3', 'u-4'],
    });

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.removeMember('conv-1', 'u-3');
    expect(api.delete).toHaveBeenCalledWith('/conversations/conv-1/members/u-3');

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.leaveConversation('conv-1');
    expect(api.delete).toHaveBeenCalledWith('/conversations/conv-1/leave');

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.promoteMember('conv-1', 'u-3');
    expect(api.post).toHaveBeenCalledWith('/conversations/conv-1/members/u-3/promote');

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.demoteMember('conv-1', 'u-3');
    expect(api.post).toHaveBeenCalledWith('/conversations/conv-1/members/u-3/demote');

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.transferOwnership('conv-1', 'u-3');
    expect(api.post).toHaveBeenCalledWith('/conversations/conv-1/transfer-ownership', {
      newOwnerId: 'u-3',
    });
  });

  it('handles message search, pagination, and around endpoints', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: { data: [], hasMore: false } });
    await chatApi.getMessages('conv-1', 'cursor-1', 20);
    expect(api.get).toHaveBeenCalledWith('/conversations/conv-1/messages', {
      params: { before: 'cursor-1', limit: 20 },
    });

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: { data: [], hasMore: false } });
    await chatApi.getMessagesAround('conv-1', 'msg-1', 50);
    expect(api.get).toHaveBeenCalledWith('/conversations/conv-1/messages/around/msg-1', {
      params: { limit: 50 },
    });

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [] });
    await chatApi.searchMessages('conv-1', 'test query', 30);
    expect(api.get).toHaveBeenCalledWith('/conversations/conv-1/messages/search', {
      params: { q: 'test query', limit: 30 },
    });
  });

  it('handles mute, archive, unarchive, block, and reports', async () => {
    vi.spyOn(api, 'patch').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.mute('conv-1', 'MESSAGES' as any, '2026-08-25T00:00:00Z');
    expect(api.patch).toHaveBeenCalledWith('/conversations/conv-1/mute', {
      muteLevel: 'MESSAGES',
      mutedUntil: '2026-08-25T00:00:00Z',
    });

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.archive('conv-1');
    expect(api.post).toHaveBeenCalledWith('/conversations/conv-1/archive');

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.unarchive('conv-1');
    expect(api.delete).toHaveBeenCalledWith('/conversations/conv-1/archive');

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.blockUser('user-99');
    expect(api.post).toHaveBeenCalledWith('/conversations/users/user-99/block');

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.unblockUser('user-99');
    expect(api.delete).toHaveBeenCalledWith('/conversations/users/user-99/block');

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [] });
    await chatApi.getBlockedUsers();
    expect(api.get).toHaveBeenCalledWith('/conversations/users/blocked');

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: { success: true } });
    await chatApi.reportUser('user-99', 'SPAM', 'Unsolicited links');
    expect(api.post).toHaveBeenCalledWith('/conversations/users/user-99/report', {
      category: 'SPAM',
      details: 'Unsolicited links',
    });
  });
});
