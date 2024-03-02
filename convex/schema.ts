import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        id: v.string(),
        name: v.string(),
        role: v.string(),
        gameId: v.string(),
        isHost: v.boolean(),
        healthPoints: v.number(),
        attackPoints: v.number(),
        skillName: v.string(),
        skillDescription: v.string(),
        skillAttackPoints: v.number(),
        skillSuccessRate: v.number(),
    }).index("by_id", ["id"]),
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
    }).index("by_id", ["id"]),
});
