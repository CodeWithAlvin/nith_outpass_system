import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

import React from 'react'

import { signInAction } from "@/lib/actions"

const SignUpModal = () => {
  return (
     <Card className="px-3 min-w-96 min-h-48 border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-mono font-bold">Sign Up</CardTitle>
        <CardDescription className="font-mono text-md sm:text-lg">
          sign up with your google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signInAction} className="grid gap-4">
          <Button variant="outline" className="w-full text-lg font-mono flex items-center gap-1 rounded-full py-5">
            <Image src='/google.svg' alt="google logo" width={35} height={35} />
            Sign up with Google
          </Button>
        </form>
        <div className="mt-8 font-sans">Sign in using your college mail that ends with @nith.ac.in</div>
      </CardContent>
    </Card>

  )
}

export {SignUpModal}
