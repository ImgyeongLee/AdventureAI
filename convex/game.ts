//"use node";

import { v } from 'convex/values';
import { action, internalMutation, internalQuery, query } from './_generated/server';
import { internal } from './_generated/api';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' }); //TODO: Make sure api key is not an empty string!

export const getGame = internalQuery({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const currentGame = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('id'), args.gameId))
      .first();

    return currentGame;
  },
});

export const getGameInfo = query({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const currentGame = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('id'), args.gameId))
      .first();

    if (currentGame) return currentGame;
  },
});

export const insertGame = internalMutation(
  async (
    { db },
    {
      id,
      imageId,
      currentDescription,
      settingDescription,
      monsterDescription,
      monsterHealthPoints,
      monsterAttackPoints,
      monsterSkillDescription,
      monsterSkillAttackPoints,
      monsterSkillSuccessRate,
    }: {
      id: number;
      imageId: any;
      currentDescription: string;
      settingDescription: string;
      monsterDescription: string;
      monsterHealthPoints: number;
      monsterAttackPoints: number;
      monsterSkillDescription: string;
      monsterSkillAttackPoints: number;
      monsterSkillSuccessRate: number;
    }
  ) => {
    // Insert the game
    await db.insert('games', {
      id, //TODO: Make sure id is unique
      status: 'lobby', // Set the initial status to lobby
      imageId: imageId,
      currentDescription,
      settingDescription,
      monsterDescription,
      monsterHealthPoints,
      monsterAttackPoints,
      monsterSkillDescription,
      monsterSkillAttackPoints,
      monsterSkillSuccessRate,
    });
  }
);

export const updateGameScene = internalMutation({
  args: {
    _id: v.id('games'),
    imageId: v.id('_storage'),
    currentDescription: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      imageId: args.imageId,
      currentDescription: args.currentDescription,
    });
  },
});

export const updateGameStatus = internalMutation({
  args: {
    _id: v.id('games'),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      status: args.status,
    });
  },
});

export const updateStatus = action({
  args: { gameId: v.number(), status: v.string() },
  handler: async (ctx, args) => {
    const currentGame = await ctx.runQuery(internal.game.getGame, {
      gameId: args.gameId,
    });

    if (currentGame) {
      await ctx.runMutation(internal.game.updateGameStatus, {
        _id: currentGame._id,
        status: args.status,
      });
    }
  },
});

export const createGame = action({
  args: { description: v.string() },
  handler: async (ctx, args) => {
    // Generate a random game id
    const id = Math.floor(Math.random() * 1000000) + 99999;

    console.log('Creating game with id: ' + id);

    // Create a GPT prompt to generate game info
    let gameGenerationPrompt = `
            You are a text-based RPG. 
            You are in a setting. 
            There is a monster. 
            The monster has health points. 
            The monster has attack points. 
            The monster has a skill. 
            The monster's skill has attack points. 
            The monster's skill has a success rate between 0 and 1. 

            In JSON format, fill in the following information about the game:
            string currentDescription (this should be describe the situation wonderfully)
            string settingDescription (this should be a short phrase), 
            string monsterDescription (this should be a short phrase), 
            integer monsterHealthPoints, 
            integer monsterAttackPoints, 
            string monsterSkillDescription (this should be a short phrase), 
            integer monsterSkillAttackPoints, 
            float monsterSkillSuccessRate.

            Here is a description of the game: 

        `;
    gameGenerationPrompt += args.description;

    console.log('Game Generation Prompt: \n' + gameGenerationPrompt);

    // Send the prompt to GPT
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a text-based RPG designed to output game information in JSON format.',
        },
        {
          role: 'user',
          content: gameGenerationPrompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    // Get the game info from GPT in JSON format
    const gameInfo = JSON.parse(completion.choices[0].message.content || '');

    console.log('Game info: \n' + JSON.stringify(gameInfo, null, 2));

    const imgPrompt = `
            Setting: ${gameInfo.settingDescription}

            Monster: ${gameInfo.monsterDescription}
        `;

    console.log('Image Generation Prompt: \n' + imgPrompt);

    // Generate an image using OpenAI's DALL-E model
    const imgCompletion = await openai.images.generate({
      //model: "dall-e-3",
      prompt: imgPrompt,
      n: 1,
      //size: "256x256",
    });

    // Get the image url from the completion
    const imageUrl = imgCompletion.data[0].url || '';

    console.log('Image URL: ' + imageUrl);

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();

    // Save the image to convex storage
    const imgId = await ctx.storage.store(imageBlob);

    console.log('Image ID: ' + imgId);

    // Insert the game into the database
    await ctx.runMutation(internal.game.insertGame, {
      id,
      imageId: imgId,
      currentDescription: gameInfo.currentDescription,
      settingDescription: gameInfo.settingDescription,
      monsterDescription: gameInfo.monsterDescription,
      monsterHealthPoints: gameInfo.monsterHealthPoints,
      monsterAttackPoints: gameInfo.monsterAttackPoints,
      monsterSkillDescription: gameInfo.monsterSkillDescription,
      monsterSkillAttackPoints: gameInfo.monsterSkillAttackPoints,
      monsterSkillSuccessRate: gameInfo.monsterSkillSuccessRate,
    });

    // Return the game id to the client
    return id;
  },
});

export const attackMonster = internalMutation({
  args: {
    _id: v.id('games'),
    currentHP: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      monsterHealthPoints: args.currentHP,
    });
  },
});

export const areAllPlayersDead = query({
    args: { gameId : v.number() },
    handler: async (ctx, args) => {
        let players = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('gameId'), args.gameId))
            .collect();
        
        for (let player of players) {
            let playerHP = player.healthPoints ? player.healthPoints : 0;
            if (playerHP > 0) return false;
        }

        return true;
    }
});