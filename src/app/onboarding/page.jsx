"use client"

import { useSession } from "next-auth/react"
import NotAuthenticated from "@/components/not-authenticated"
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { submitPhoneNumbers } from '@/lib/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { redirect } from "next/navigation"

export default  function Home() {
  const { data: session,status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state,setState] = useState()

  const handleSubmit =async  (formData) => {
    setState(false)
    setIsSubmitting(true)
    let response = await submitPhoneNumbers(formData)
    setIsSubmitting(false)
    
    if (response?.success){
      redirect("/")
    }else{
      setState({success:false,message:"An error occured during saving data"})
    }
  }

  if (status === "unauthenticated"){
    return <NotAuthenticated/>
  }
  if (status === "loading"){
    return  <div className="flex justify-center items-center text-2xl font-bold w-screen h-screen animate-pulse bg-neutral-100 dark:bg-neutral-800">loading...</div>
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen flex items-center">
     <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Phone Number Registration</CardTitle>
        <CardDescription>Please enter your phone number and your parent&apos;s phone number.</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userPhone">Your Phone Number</Label>
            <Input 
              id="userPhone" 
              name="userPhone" 
              type="tel" 
              placeholder="+1234567890" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentPhone">Parent&apos;s Phone Number</Label>
            <Input 
              id="parentPhone" 
              name="parentPhone" 
              type="tel" 
              placeholder="+1234567890" 
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          {state && (
            <div className={`flex items-center mt-4 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
              {state.success ? <CheckCircle2 className="mr-2" /> : <AlertCircle className="mr-2" />}
              <p>{state.message}</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}




