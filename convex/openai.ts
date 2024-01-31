"use node";
import OpenAI from "openai";
import { v } from "convex/values";
import { action } from "./_generated/server";

export const getRecipesTitles = action({
  args: { ingredients: v.array(v.string()) },
  handler: async (ctx, { ingredients }) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Someone is opening its fridge and kitchen cupboard. They find the following ingredients: ${ingredients.join(
      ", "
    )}. They want to cook a main dish with these ingredients. What should they cook? Provide them with 8 different recipe titles only. Return the titles as a JavaScript array of strings, like this example: ["Recipe Title 1", "Recipe Title 2", ...]`;

    console.log("prompt", prompt);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(chatCompletion.choices[0].message);
    return [chatCompletion?.choices[0]?.message?.content].filter(Boolean);
  },
});
