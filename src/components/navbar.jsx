"use client"
import {CircleUserRound} from 'lucide-react';
import {Button} from '@/components/ui/button';
import { signOut, useSession} from "next-auth/react"
import Link from 'next/link';

export default function Navbar() {
  const {data: session} = useSession()

  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 flex-col sm:flex-row">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-200">KOPS</Link>
        <div className='flex items-center space-x-4'>
        <Link href='/history'  className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-lg font-bold">
         History
        </Link>
        <Link href="/profile" className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-lg">
            <div className="text-gray-800 dark:text-gray-200 pr-2 font-bold">{session?.user?.email?.split("@")[0]}</div>
            <CircleUserRound  size="28" />
        </Link>
        <Button onClick={signOut} variant="destructive">Logout</Button>
      </div>
      </div>
    </div>
  )
}