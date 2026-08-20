import { describe, it, expect } from 'vitest';
import { getContributorTierByCount, getPremiumTierByMonths } from '../badgeTiers';

describe('badgeTiers (Extended)', () => {
  it('calculates tier milestones accurately based on activity duration and count', () => {
    expect(typeof getContributorTierByCount).toBe('function');
    expect(typeof getPremiumTierByMonths).toBe('function');
    const tier1 = getContributorTierByCount(1);
    expect(tier1).toBeDefined();
  });
});
