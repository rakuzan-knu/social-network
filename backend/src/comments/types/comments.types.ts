import { type Comment } from '@prisma/client';

export type GetAllCommentsResult = {
  data: Comment[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};
