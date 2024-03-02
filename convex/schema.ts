import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        id: v.string(),
        name: v.string(),
        role: v.string(),
    }).index("by_id", ["id"]),
    games: defineTable({
        id: v.number(),
        name: v.string(),
        description: v.string(),
        price: v.number(),
    }).index("by_id", ["id"]),
});
