"use client"

import { PropsWithChildren } from "react"
import {HeroUIProvider} from "@heroui/system";


export const Providers = ({children}: PropsWithChildren) => {
    return <HeroUIProvider>{children}</HeroUIProvider>
}