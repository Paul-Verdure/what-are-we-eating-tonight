import { query, mutation } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("messages").collect();
});

export const send = mutation(async (ctx, { body }) => {
  await ctx.db.insert("messages", {
    body,
    author: "user",
  });
  const botMessageId = await ctx.db.insert("messages", {
    author: "assistant",
  });
  const messages = await ctx.db
    .query("messages")
    .order("desc")
    .filter((q) => q.neq(q.field("body"), undefined))
    .take(21);
    messages.reverse();
    return { messages, botMessageId };
});
