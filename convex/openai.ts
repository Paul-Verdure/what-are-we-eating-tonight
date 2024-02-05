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
        "recipe": "Recipe Title 1",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 2",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 3",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 4",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 5",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 6",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 7",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
      }, {
        "recipe": "Recipe Title 8",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
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
