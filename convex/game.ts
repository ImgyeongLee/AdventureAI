import { v } from "convex/values";
import { action, internalMutation } from './_generated/server';
import { internal } from './_generated/api';
import { OpenAI } from "openai";

const openai = new OpenAI();

const insertGame = internalMutation(async ({db},
    {
        id,
        settingDescription,
        monsterDescription,
        monsterHealthPoints,
        monsterAttackPoints,
        monsterSkillDescription,
        monsterSkillAttackPoints,
        monsterSkillSuccessRate
    } : {
        id: number,
        settingDescription: string,
        monsterDescription: string,
        monsterHealthPoints: number,
        monsterAttackPoints: number,
        monsterSkillDescription: string,
        monsterSkillAttackPoints: number,
        monsterSkillSuccessRate: number
     }) => {
        // Insert the game
        await db.insert("games", {
            id, //TODO: Make sure id is unique
            status : "lobby", // Set the initial status to lobby
            settingDescription,
            monsterDescription,
            monsterHealthPoints,
            monsterAttackPoints,
            monsterSkillDescription,
            monsterSkillAttackPoints,
            monsterSkillSuccessRate
        });
    }
);

const createGame = action({
    args: { description : v.string() },
    handler: async (ctx, args) => {
        // Generate a random game id
        let id = Math.floor(Math.random() * 1000000);

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
            \n
            In JSON format, provide the following information about the game:
            settingDescription, 
            monsterDescription, 
            monsterHealthPoints, 
            monsterAttackPoints, 
            monsterSkillDescription, 
            monsterSkillAttackPoints, 
            monsterSkillSuccessRate.
            \n\n
            Here is a description of the game:\n
        `;
        gameGenerationPrompt += args.description;

        // Send the prompt to GPT
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a text-based RPG designed to output game information in JSON format.",
                },
                {
                    role: "user",
                    content: gameGenerationPrompt,
                },
            ],
            model: "gpt-3.5-turbo-0125",
            max_tokens: 1000,
            response_format: { "type": "json_object" },
        });

        // Get the game info from GPT in JSON format
        const gameInfo = JSON.parse(completion.choices[0].message.content || "");

        // Insert the game into the database //TODO
        await ctx.runMutation(internal.myMutations.insertGame, {
            id,
            settingDescription: gameInfo.settingDescription,
            monsterDescription: gameInfo.monsterDescription,
            monsterHealthPoints: gameInfo.monsterHealthPoints,
            monsterAttackPoints: gameInfo.monsterAttackPoints,
            monsterSkillDescription: gameInfo.monsterSkillDescription,
            monsterSkillAttackPoints: gameInfo.monsterSkillAttackPoints,
            monsterSkillSuccessRate: gameInfo.monsterSkillSuccessRate
        });

        // Return the game id to the client
        return id;
    }
});