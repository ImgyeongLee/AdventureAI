import { query } from './_generated/server';
import { v } from 'convex/values';


export const getImageURL = query({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('id'), args.gameId))
      .first();


    return game?.imageUrl;
  },
});
