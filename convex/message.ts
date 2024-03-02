import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getMessages = query({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('messages')
      .filter((q) => q.eq(q.field('gameId'), args.gameId))
      .collect();
  },
});

export const createMessage = mutation({
  args: { userId: v.string(), gameId: v.number(), sender: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert('messages', {
      userId: args.userId,
      gameId: args.gameId,
      sender: args.sender,
      body: args.body,
    });
    return newMessageId;
  },
});
