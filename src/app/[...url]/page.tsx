import { ChatWrapper } from "@/components/ChatWrapper"
import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { cookies } from "next/headers"


interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructUrl({ url }: { url:string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component)) //in-built JS method to decode the encoded url

    return decodedComponents.join("/")
}

const Page = async({ params }: PageProps) => {

    const sessionCookie = cookies().get("sessionId")?.value
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "");

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId})


    if(!isAlreadyIndexed) { //go to the reconstructedUrl and load the data to ragChat
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 200 }
        })
        //chunkSize: This defines how big each text chunk will be
        //chunkOverlap: chunkOverlap: 50 → each new chunk will overlap by 50 characters with the previous one.
        //Maintaining context continuity between chunks

        await redis.sadd("indexed-url", reconstructedUrl)
    }
   
    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
}

export default Page;