import { mutation } from './_generated/server';

const createGame = mutation(async ({db},
    {settingDescription, monsterDescription, monsterHealthPoints, monsterAttackPoints, monsterSkillDescription, monsterSkillAttackPoints, monsterSkillSuccessRate} : {
        settingDescription: string,
        monsterDescription: string,
        monsterHealthPoints: number,
        monsterAttackPoints: number,
        monsterSkillDescription: string,
        monsterSkillAttackPoints: number,
        monsterSkillSuccessRate: number
     }) => {

        // Generate a random game id
        //TODO: Make sure gameId is unique
        let gameId = Math.floor(Math.random() * 1000000);

        // Set status to "lobby"
        let status = "lobby";

        //TODO: Make sure success rate is between 0 and 1
        
        // Create the game
        await db.insert("games", {id: gameId, status, settingDescription, monsterDescription, monsterHealthPoints, monsterAttackPoints, monsterSkillDescription, monsterSkillAttackPoints, monsterSkillSuccessRate});
    }
);