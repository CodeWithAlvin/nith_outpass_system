import { auth } from "@/lib/auth"
import NotAuthenticated from "@/components/not-authenticated"
import PassTab from "@/components/home"
import Navbar from "@/components/navbar"
import {fetchUserDetails} from "@/lib/fetchData"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session?.user || (session?.user?.role === "guard" || session?.user?.role === "mmca")){
    return <NotAuthenticated/>
  }

  const userData = await fetchUserDetails(session?.user?.email)
  if (!(userData?.phoneNumber && userData.parentsNumber)){
    redirect("/onboarding")
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen">
      <Navbar/>
     <PassTab/>
    </div>
  );
}


