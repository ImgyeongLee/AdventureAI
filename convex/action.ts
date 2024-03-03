import { action } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';

export const create = action({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.user.createUser, {
      userId: args.userId,
    });
  },
});
