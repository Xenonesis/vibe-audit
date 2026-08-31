import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handleUserChat(chatHistory: OpenAI.Chat.ChatCompletionMessageParam[]) {
    // Vibe-coded LLM call without token bounds or message history windowing
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [...chatHistory]
    });
    return completion.choices[0].message.content;
}
