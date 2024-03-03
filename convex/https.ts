import { query } from './_generated/server';
import { v } from 'convex/values';

export const getImageId = query({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('id'), args.gameId))
      .first();

    const imageStorageId = game?.imageId;

    if (!imageStorageId) {
      // TODO: default image
    }

    return imageStorageId;
  },
});

export const getImageURL = query({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('id'), args.gameId))
      .first();

    const imageStorageId = game?.imageId;
    const imageUrl = imageStorageId ? await ctx.storage.getUrl(imageStorageId) : 'default';

    // TODO: use and actual default image url

    return imageUrl;
  },
});

/*
http.route({
    path : "/image/:imageId",
    method : "GET",
    handler : httpAction(async (ctx, req) => {
        const { searchParams } = new URL(req.url);
        let storageId = searchParams.get("storageId");

        if(!storageId) {
            return { status: 404, body: "Imabe Not found" };
        }

        const blob = await ctx.storage.get(storageId);
        return { status: 200, body: blob};
    }
});
*/
