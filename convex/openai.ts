"use node";
import OpenAI from "openai";
import { v } from "convex/values";
import { action } from "./_generated/server";

export const getRecipesTitles = action({
  args: { ingredients: v.array(v.string()), preferences: v.array(v.string()) },
  handler: async (ctx, { ingredients, preferences }) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Create a list of up to 8 ${preferences.join(
      ", "
    )} recipes using the ingredients: ${ingredients.join(
      ", "
    )}. You can choose not to use all listed ingredients in each recipe, and you may include up to 3 additional ingredients of your own in each recipe.
    
    Provide an RFC8259 compliant JSON response without explanations:
    
    [{
      "title": "Recipe Title 1",
      "description": "Recipe description 1"
    }, {
      "title": "Recipe Title 2",
      "description": "Recipe description 2"
    }, {
      "title": "Recipe Title 3",
      "description": "Recipe description 3"
    }, {
      "title": "Recipe Title 4",
      "description": "Recipe description 4"
    }, {
      "title": "Recipe Title 5",
      "description": "Recipe description 5"
    }, {
      "title": "Recipe Title 6",
      "description": "Recipe description 6"
    }, {
      "title": "Recipe Title 7",
      "description": "Recipe description 7"
    }, {
      "title": "Recipe Title 8",
      "description": "Recipe description 8"
    }]`;

    console.log("prompt", prompt);

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
