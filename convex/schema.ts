import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    id: v.string(),
    name: v.optional(v.string()),
    gameId: v.optional(v.string()),
    role: v.optional(v.string()),
    isHost: v.optional(v.boolean()),
    healthPoints: v.optional(v.number()),
    attackPoints: v.optional(v.number()),
    skillName: v.optional(v.string()),
    skillDescription: v.optional(v.string()),
    skillAttackPoints: v.optional(v.number()),
    skillSuccessRate: v.optional(v.number()),
  }).index('by_userId', ['id']),
  games: defineTable({
    id: v.number(),
    status: v.string(),
    settingDescription: v.string(),
    monsterDescription: v.string(),
    monsterHealthPoints: v.number(),
    monsterAttackPoints: v.number(),
    monsterSkillDescription: v.string(),
    monsterSkillAttackPoints: v.number(),
    monsterSkillSuccessRate: v.number(),
  }).index('by_gameId', ['id']),
  messages: defineTable({
    gameId: v.number(),
    userId: v.string(),
    sender: v.string(),
    body: v.string(),
  }),
});
