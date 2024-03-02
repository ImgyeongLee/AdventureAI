import { Configuration, OpenAIApi } from "openai";
import { action } from "../_generated/server";

export const chat = action(async (ctx, { body }) => {
  const { messages, botMessageId } = await ctx.runMutation(api.messages.send, { body });
  const fail = async (reason) => { throw new Error(reason); };

  // Grab the API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    await fail("Add your OPENAI_API_KEY as an env variable");
  }
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const openaiResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: instructions,
      },
      ...messages.map(({ body, author }) => ({
        role: author,
        content: body,
      })),
    ],
  });
  if (openaiResponse.status !== 200) {
    await fail("OpenAI error: " + openaiResponse.statusText);
  }
  const body = openaiResponse.data.choices[0].message.content;
	console.log("Response: " + body);
});
