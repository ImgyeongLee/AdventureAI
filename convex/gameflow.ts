import { action, internalAction } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export const generateFirstScene = action({
  args: { gameId: v.number() },
  handler: async (ctx, args) => {
    const currentGame = await ctx.runQuery(internal.game.getGame, {
      gameId: args.gameId,
    });

    if (currentGame) {
      const setting = currentGame.currentDescription;
      let prompt = `You are a text-based RPG. 
      You are in a setting. 
      There is a monster.
      In JSON format, generate text about a cool starting battle scene (maximum is 500 characters):
      
      string currentDescription

      Here is a description of the setting: 
      `;
      prompt += setting;

      // Send the prompt to GPT
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a text-based RPG designed to output game information in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      });

      // Get the game info from GPT in JSON format
      const gameInfo = JSON.parse(completion.choices[0].message.content || '');

      console.log(gameInfo);

      const imgPrompt = `
              Setting: ${gameInfo.currentDescription}
              Monster: ${gameInfo.monsterDescription}
              Style: Realistic
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

      await ctx.runMutation(internal.game.updateGameScene, {
        _id: currentGame._id,
        imageId: imgId,
        currentDescription: gameInfo.currentDescription,
      });
    }
  },
});

export const generateFinalScene = internalAction({
  args: { gameId: v.number(), monsterDeathDescription: v.string() },
  handler: async (ctx, args) => {
    const currentGame = await ctx.runQuery(internal.game.getGame, {
      gameId: args.gameId,
    });

    if (currentGame) {
      const setting = currentGame.currentDescription;
      let prompt = `You are a text-based RPG. 
      You are in a setting. 
      There is a dead monster.
      In JSON format, generate text describing the scene after the monster was killed in a battle (maximum is 500 characters):
      
      string currentDescription

      Here is a description of the setting: 
      `;
      prompt += setting;
      prompt += `\nThe monster died: ${args.monsterDeathDescription}`;

      // Send the prompt to GPT
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a text-based RPG designed to output game information in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      });

      // Get the game info from GPT in JSON format
      const gameInfo = JSON.parse(completion.choices[0].message.content || '');

      console.log(gameInfo);

      const imgPrompt = `
              Setting: ${gameInfo.currentDescription}
              Monster: ${gameInfo.monsterDescription}
              Style: Realistic
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

      await ctx.runMutation(internal.game.updateGameScene, {
        _id: currentGame._id,
        imageId: imgId,
        currentDescription: gameInfo.currentDescription,
      });
    }
  },
});

export const monsterResponse = action({
  args: { gameId: v.number(), userId: v.string(), usingSkill: v.boolean() },
  handler: async (ctx, args) => {
    const currentMonster = await ctx.runQuery(internal.game.getGame, {
      gameId: args.gameId,
    });

    const currentUser = await ctx.runQuery(internal.user.getUser, {
      userId: args.userId,
    });

    if (currentMonster && currentUser) {
      if (args.usingSkill) {
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `${currentUser.name} used their special skill against the monster!\n(${currentUser.skillName}: ${currentUser.skillDescription})`,
        });
      } else {
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `${currentUser.name} attacked the monster!`,
        });
      }
    }

    let monsterHP = currentMonster.monsterHealthPoints;
    let userHP = currentUser.healthPoints;

    // User phase (User -> Monster)
    if (args.usingSkill) {
      const isUserSuccessSkill = Math.floor(Math.random() * 101) < currentUser.skillSuccessRate;

      // If the user used skill
      if (isUserSuccessSkill) {
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `${currentUser.name} used their special skill against the monster!\n(${currentUser.skillName}: ${currentUser.skillDescription})\nMonster: (-${currentUser.skillAttackPoints})`,
        });

        monsterHP -= currentUser.skillAttackPoints;

        if (monsterHP <= 0) {

          // Create a message that the player killed the monster
          await ctx.runMutation(internal.message.createMessage, {
            userId: 'System',
            gameId: args.gameId,
            sender: 'System',
            body: `${currentUser.name} killed the monster!`,
          });

          let monsterDeathDesc = `The monster died.\nMonster: ${currentMonster.monsterDescription}\n`;
          if (args.usingSkill) {
            monsterDeathDesc += `The monster died from ${currentUser.name}'s special skill.\n`;
            monsterDeathDesc += `(${currentUser.skillName}: ${currentUser.skillDescription})`;
          }

          // Final scene generation
          await ctx.runMutation(internal.game.generateFinalScene, {
            gameId: args.gameId,
            monsterDeathDescription: monsterDeathDesc,
          });

          // Change the game status done
          await ctx.runMutation(internal.game.updateGameStatus, {
            _id: currentMonster._id,
            status: 'win',
          });
          return;
        } else {
          await ctx.runMutation(internal.game.attackMonster, {
            _id: currentMonster._id,
            currentHP: monsterHP,
          });
        }
        // When they failed
      } else {
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `${currentUser.name} tried to use their special skill but it failed.`,
        });
      }
    } else {
      await ctx.runMutation(internal.message.createMessage, {
        userId: 'System',
        gameId: args.gameId,
        sender: 'System',
        body: `${currentUser.name} attacked the monster!\nMonster: (-${currentUser.attackPoints})`,
      });
    }

    // Monster Phase
    const isMonsterSkill = Math.floor(Math.random() * 101) < 30;

    if (isMonsterSkill) {
      const isMonsterSuccessSkill = Math.floor(Math.random() * 101) / 100 < currentMonster.monsterSkillSuccessRate;
      if (isMonsterSuccessSkill) {
        userHP -= currentMonster.monsterSkillAttackPoints;
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `The monster attacked ${currentUser.name} with a special skill!\n${currentMonster.monsterSkillDescription}\n${currentUser.name}: (-${currentMonster.monsterSkillAttackPoints})`,
        });
      } else {
        await ctx.runMutation(internal.message.createMessage, {
          userId: 'System',
          gameId: args.gameId,
          sender: 'System',
          body: `The monster tried to use a special skill but it failed.`,
        });
      }
    } else {
      userHP -= currentMonster.monsterAttackPoints;
      await ctx.runMutation(internal.message.createMessage, {
        userId: 'System',
        gameId: args.gameId,
        sender: 'System',
        body: `The monster attacked ${currentUser.name}!!\n${currentUser.name}: (-${currentMonster.monsterAttackPoints})`,
      });
    }

    if (userHP <= 0) {
      await ctx.runMutation(internal.message.createMessage, {
        userId: 'System',
        gameId: args.gameId,
        sender: 'System',
        body: `${currentUser.name} is dead.`,
      });
    }

    await ctx.runMutation(internal.user.attackUser, {
      _id: currentUser._id,
      currentHP: userHP,
    });
  },
});
