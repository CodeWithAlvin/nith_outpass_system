import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Home, ShoppingBag } from 'lucide-react'
import {fetchUserOutpasses} from "@/lib/fetchData"
import {auth}  from "@/lib/auth"
import {formatDate} from "@/lib/utils"

const StatusBadge = ({status} ) => {
  const statusColors = {
    approved: 'bg-green-500',
    pending: 'bg-yellow-500',
    rejected: 'bg-red-500',
  }

  return (
    <Badge className={`${statusColors[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default async  function History() {
  const session = await auth()

  const {outPassData,outpassesError} =await  fetchUserOutpasses(session?.user?.email )
  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-full min-h-screen">
        <Navbar/>
        <h1 className="text-3xl text-center mt-10">Your Passes</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-8 mt-8">
        {outPassData && outPassData.map((outpass) => (
          <Card key={outpass.id} className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  {outpass.type === 'market' ? (
                    <ShoppingBag className="mr-2" />
                  ) : (
                    <Home className="mr-2" />
                  )}
                  {outpass.type.charAt(0).toUpperCase() + outpass.type.slice(1)} Pass
                </span>
                <span className="flex space-x-2 items-center">
                <StatusBadge status={outpass.status} />
                <Badge className={outpass.isOut ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}>
                  {outpass.isOut ? 'Out' : 'In'}
                </Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center mb-2">
                <CalendarDays className="mr-2" />
                <span className="font-semibold">From:</span>
                <span className="ml-2">{formatDate(outpass.fromDate)}</span>
              </div>
              <div className="flex items-center mb-2">
                <CalendarDays className="mr-2" />
                <span className="font-semibold">To:</span>
                <span className="ml-2">{formatDate(outpass.toDate)}</span>
              </div>
              {outpass.type === 'home' && outpass.place && (
                <div className="flex items-center mb-2">
                  <Home className="mr-2" />
                  <span className="font-semibold">Place:</span>
                  <span className="ml-2">{outpass.place}</span>
                </div>
              )}
              <div className="mt-4">
                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}




