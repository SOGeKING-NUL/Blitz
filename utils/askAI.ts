import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ModelMessage, streamText } from "ai";
import "dotenv/config"

const openRouter= createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!
});

const model = openRouter("openai/gpt-4.1-mini");

const messages: ModelMessage[]= [];

export default async function askAI(userInput: string){

  messages.push({
    role: "user", 
    content: userInput
  });

  const result= streamText({
    model,
    messages
  });

  let fullResponse="";
  
  for await (const word of result.textStream){
    fullResponse+= word;
  }
  messages.push({
    role: "assistant",
    content: fullResponse
  })

  return fullResponse;
  
};