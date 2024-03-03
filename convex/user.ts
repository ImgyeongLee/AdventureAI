import { query, internalMutation, internalQuery } from './_generated/server';
import { v } from 'convex/values';

export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').collect();
  },
});

export const getUser = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('id'), args.userId))
      .first();

    if (currentUser) return currentUser;
  },
});

export const createUser = internalMutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('id'), args.userId))
      .first();

    if (user) return;
    await ctx.db.insert('users', {
      id: args.userId,
    });
  },
});

export const updateQuestGameId = internalMutation({
  args: {
    _id: v.id('users'),
    gameId: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      gameId: args.gameId,
    });
  },
});

export const setUserGuest = internalMutation({
  args: {
    _id: v.id('users'),
    name: v.string(),
    isHost: v.boolean(),
    role: v.string(),
    healthPoints: v.number(),
    attackPoints: v.number(),
    skillName: v.string(),
    skillDescription: v.string(),
    skillAttackPoints: v.number(),
    skillSuccessRate: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      name: args.name,
      isHost: args.isHost,
      role: args.role,
      healthPoints: args.healthPoints,
      attackPoints: args.attackPoints,
      skillName: args.skillName,
      skillDescription: args.skillDescription,
      skillAttackPoints: args.skillAttackPoints,
      skillSuccessRate: args.skillSuccessRate,
    });
  },
});

export const setUserHost = internalMutation({
  args: {
    _id: v.id('users'),
    gameId: v.number(),
    name: v.string(),
    isHost: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      gameId: args.gameId,
      name: args.name,
      isHost: args.isHost,
    });
  },
});
