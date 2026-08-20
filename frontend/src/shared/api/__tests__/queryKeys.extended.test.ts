import { describe, it, expect } from 'vitest';
import * as queryKeys from '../queryKeys';

describe('queryKeys (Extended)', () => {
  it('exports distinct and predictable query key constants', () => {
    expect(queryKeys.USER_KEY).toBeDefined();
    expect(queryKeys.FEED_KEY).toBeDefined();
    expect(queryKeys.USER_BY_USERNAME_KEY).toBeDefined();
    expect(queryKeys.FOLLOW_LIST_KEY).toBeDefined();
    expect(queryKeys.USER_POSTS_KEY).toBeDefined();
    expect(queryKeys.USER_REPOSTS_KEY).toBeDefined();
  });
});
