import { cn } from "@/lib/utils"
import {BotIcon, User2} from "lucide-react";

interface MessageProps {
    content: string
    isUserMessage: boolean //did ai write this message or the user?
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
    return ( 
        <div 
        className={cn({
            "bg-zinc-800": isUserMessage,
            "bg-zinc-900/25": !isUserMessage,
        })}
    >
        <div className="p-6">
            <div className="max-w-3xl mx-auto flex items-start gap-2.5">
                <div className={cn("size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
                    {
                        "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
                    }
                )}>
                    {isUserMessage ? <User2 className="size-5"/> : <BotIcon className="size-5 text-white"/>}
                </div>

                <div className="flex flex-col ml-6 w-full">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white dark:text-white"> 
                            {isUserMessage ? "You" : "Website"}
                        </span>
                    </div>

                    <p
                        className="text-sm font-normal py-2.5 text-white dark:text-white"
                    >
                        {content}
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}