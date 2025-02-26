import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs"; //specially for ai vercel sdk
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { messages, sessionId } = await req.json()

     //out of all messages, we are only interested in the last message as we want answer to that last message from our rag-chat (ai)
    const lastMessage = messages[messages.length - 1].content //text-content of the message
    
    const response = await ragChat.chat(lastMessage,{ streaming: true, sessionId}) //input: lastMessage, get response from rag-chat (response)

   // console.log("response", response)

    return aiUseChatAdapter(response); //takes the response of ReadableStream type and stream it to the client side using this adapter
}