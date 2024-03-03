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

export const sentMessage = action({
  args: { userId: v.string(), gameId: v.number(), body: v.string() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentUser) {
      if (currentUser.name) {
        await ctx.runMutation(internal.message.createMessage, {
          gameId: args.gameId,
          sender: currentUser.name,
          body: args.body,
        });
      } else {
        await ctx.runMutation(internal.message.createMessage, {
          gameId: args.gameId,
          sender: args.userId,
          body: args.body,
        });
      }
    }
  },
});
