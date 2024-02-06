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

    const prompt = `Create a list of 8 recipes that can be made with the following ingredients: ${ingredients.join(
      ", "
    )}.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [{
        "title": "Recipe Title 1",
        "description": "Recipe description 1",
      }, {
        "title": "Recipe Title 2",
        "description": "Recipe description 2",

      }, {
        "title": "Recipe Title 3",
        "description": "Recipe description 3",

      }, {
        "title": "Recipe Title 4",
        "description": "Recipe description ",

      }, {
        "title": "Recipe Title 5",
        "description": "Recipe description 5",

      }, {
        "title": "Recipe Title 6",
        "description": "Recipe description 6",

      }, {
        "title": "Recipe Title 7",
        "description": "Recipe description 7",

      }, {
        "title": "Recipe Title 8",
        "description": "Recipe description 8",

      }]
    `;



    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { role: "system", content: "You are a helpful recipe assistant." },
        { role: "user", content: prompt },
      ],
    });
    console.log(chatCompletion.choices[0].message);
    return chatCompletion?.choices[0]?.message?.content;
  },
});
