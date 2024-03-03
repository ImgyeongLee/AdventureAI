import { action } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' }); //TODO: Make sure api key is not an empty string!

export const create = action({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.user.createUser, {
      userId: args.userId,
    });
  },
});

export const getGameId = action({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentUser) {
      return currentUser.gameId;
    }
  },
});

export const setUserGameId = action({
  args: { userId: v.string(), gameId: v.number() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentUser) {
      await ctx.runMutation(internal.user.updateQuestGameId, {
        _id: currentUser._id,
        gameId: args.gameId,
      });
    }
  },
});

export const setGuest = action({
  args: { userId: v.string(), name: v.string(), skill: v.string(), healthPoints: v.number() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentUser) {
      let guestGenerationPrompt = `
            In JSON format, fill in the following information about the game:

            string role (this should be a short phrase), 
            integer attackPoints (this should be 10 ~ 50), 
            string skillName, 
            string skillDescription, 
            string monsterSkillDescription (this should be a short phrase), 
            integer skillAttackPoints, 
            integer skillSuccessRate.

            Here is a description of the game: 

        `;

      guestGenerationPrompt += args.skill;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a text-based RPG designed to output game information in JSON format.',
          },
          {
            role: 'user',
            content: guestGenerationPrompt,
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      });

      const guestInfo = JSON.parse(completion.choices[0].message.content || '');

      await ctx.runMutation(internal.user.setUserGuest, {
        _id: currentUser._id,
        isHost: false,
        name: args.name,
        role: guestInfo.role,
        healthPoints: args.healthPoints,
        attackPoints: guestInfo.attackPoints,
        skillName: guestInfo.skillName,
        skillDescription: guestInfo.skillDescription,
        skillAttackPoints: guestInfo.skillAttackPoints,
        skillSuccessRate: guestInfo.skillSuccessRate,
      });
    }
  },
});

export const sentMessage = action({
  args: { userId: v.string(), gameId: v.number(), body: v.string() },
  handler: async (ctx, args) => {
    if (args.userId == 'System') {
      await ctx.runMutation(internal.message.createMessage, {
        userId: 'System',
        gameId: args.gameId,
        sender: 'System',
        body: args.body,
      });
    } else {
      const currentUser = await ctx.runQuery(internal.user.getUser, {
        userId: args.userId,
      });

      if (currentUser) {
        if (currentUser.name) {
          await ctx.runMutation(internal.message.createMessage, {
            userId: args.userId,
            gameId: args.gameId,
            sender: currentUser.name,
            body: args.body,
          });
        } else {
          await ctx.runMutation(internal.message.createMessage, {
            userId: args.userId,
            gameId: args.gameId,
            sender: args.userId,
            body: args.body,
          });
        }
      }
    }
  },
});

export const setHost = action({
  args: { userId: v.string(), gameId: v.number() },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentUser) {
      await ctx.runMutation(internal.user.setUserHost, {
        _id: currentUser._id,
        isHost: true,
        name: 'Host',
        gameId: args.gameId,
      });
    }
  },
});
