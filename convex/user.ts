import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').collect();
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('id'), args.userId))
      .first();
  },
});

export const createUser = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert('users', {
      id: args.userId,
    });
    return newUserId;
  },
});

export const updateUser = mutation({
  args: {
    _id: v.id('users'),
    name: v.optional(v.string()),
    isHost: v.boolean(),
    gameId: v.optional(v.string()),
    role: v.optional(v.string()),
    healthPoints: v.optional(v.number()),
    attackPoints: v.optional(v.number()),
    skillName: v.optional(v.string()),
    skillDescription: v.optional(v.string()),
    skillAttackPoints: v.optional(v.number()),
    skillSuccessRate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updatedUser = await ctx.db.patch(args._id, {
      name: args.name,
      isHost: args.isHost,
      gameId: args.gameId,
      role: args.role,
      healthPoints: args.healthPoints,
      attackPoints: args.attackPoints,
      skillName: args.skillName,
      skillDescription: args.skillDescription,
      skillAttackPoints: args.skillAttackPoints,
      skillSuccessRate: args.skillSuccessRate,
    });
    return updatedUser;
  },
});
