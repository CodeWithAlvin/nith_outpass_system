'use client'
import { Suspense } from 'react'
import Image from "next/image"

import {Container} from "@/components/container"
import { SignUpModal } from "@/components/signup-modal";


function SignUpSuspense(){
  return <SignUpModal />
}

export default function Auth() {
  return (
    <Container className="flex flex-col justify-start md:justify-center md:flex-row h-dvh overflow-x-hidden px-3 bg-gradient-to-br from-neutral-100 via-slate-100 to-zinc-300 dark:from-neutral-900 dark:from-neutral-900 dark:from-neutral-900">
      <div className="flex md:flex-col mt-16 mb-24 gap-2 items-center justify-center text-center w-1/2 md:h-full">
        <Image className="dark:invert" src="/logo.png" width={80} height={60} alt={"logo"}/>
        <span className="text-4xl font-extrabold font-mono">KOPS</span>
      </div>
      <Suspense>
        <SignUpSuspense />
      </Suspense>
    </Container>
  )
}




