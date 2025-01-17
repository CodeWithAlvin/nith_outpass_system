"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import {doCredentialsSignIn} from "@/lib/actions"
import { useState } from 'react'

export default function LoginPanel() {
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [error,setError] = useState()

  async function handleSignIn(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    setError("")
    setIsSubmitting(true)
    let response = await doCredentialsSignIn(formData)
    console.log(response)
    if (response.success){
      setIsSubmitting(false)
      // have to fallback to js as router.push is not working on subsquent login
      window.location.href = "/dashboard";
    }else{
      setError(response.message)
    }
    setIsSubmitting(false)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="NITH Logo"
              width={64}
              height={64}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            KBH Out Pass System Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <form onSubmit={(event)=>handleSignIn(event)}>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
            />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
              />
            </div>
            <Button type="submit" className="w-full mt-6 cursor-pointer" disabled={isSubmitting}>Log In</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {error && (
            <div className={`flex items-center mt-4  text-red-600`}>
              <AlertCircle className="mr-2" />
              <p>{error}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}