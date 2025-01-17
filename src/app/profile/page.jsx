import { auth } from "@/lib/auth"
import NotAuthenticated from "@/components/not-authenticated"
import Navbar from "@/components/navbar"
import Link from 'next/link';
import { fetchUserDetails } from "@/lib/fetchData";

export default async function Home() {
  const session = await auth()
  if (!session?.user){
    return <NotAuthenticated/>
  }
  const userDetails = await fetchUserDetails(session.user.email)

  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen">
      <Navbar/>
        <div className="flex flex-col mx-4 mt-10 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Hello, {session?.user?.email?.split("@")[0]}</h1>
            <div className="container mx-auto p-4 max-w-md">
          </div>
            <div className="flex flex-row items-center mt-10">
            <p className="text-3xl sm:text-3xl text-gray-800 dark:text-gray-200">Phone Number :</p>
            <p className="text-3xl sm:text-3xl text-gray-800 dark:text-gray-200 pl-6">{userDetails.phoneNumber}</p>
            </div>
            <div className="flex flex-row items-center">
            <p className="text-3xl sm:text-3xl text-gray-800 dark:text-gray-200">Parents Phone Number :</p>
            <p className="text-3xl sm:text-3xl text-gray-800 dark:text-gray-200 pl-6">{userDetails.parentsNumber}</p>
            </div>
            <Link href="/onboarding" className=" mt-10 text-xl font-bold bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black w-min px-4 py-2 rounded-md">Edit</Link>
        </div>

    </div>
  );
}


