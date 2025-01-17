'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateOutpassStatus } from "@/lib/actions";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Home, ShoppingBag,NotebookPen } from "lucide-react";

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

export default function GuardPortal({filteredOutpasses,setOutpasses}) {

  const handleStatusUpdate = (id, newStatus) => {
    setOutpasses(prevOutpasses =>
      prevOutpasses.map(outpass =>
        outpass.id === id ? { ...outpass, status: newStatus, isOut: ( newStatus==="approved"?true:false) } : outpass
      )
    );
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">MMCA Portal - Outpass Approval</h1>
      <div className="flex flex-wrap items-center justify-center">
        {filteredOutpasses.map(outpass => (
          <OutpassItem 
            key={outpass.id} 
            outpass={outpass} 
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
}


function OutpassItem({ outpass, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    const result = await updateOutpassStatus(outpass.id, newStatus);
    if (result.success) {
      onStatusUpdate(outpass.id, newStatus);
    }
    setIsUpdating(false);
  };

  return (
    <Card key={outpass.id} className="overflow-hidden m-4">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-between space-x-16">
                <span className="flex items-center">
                  {outpass.type === 'market' ? (
                    <ShoppingBag className="mr-2" />
                  ) : (
                    <Home className="mr-2" />
                  )}
                  {outpass.reason.charAt(0).toUpperCase() + outpass.reason.slice(1)} Pass
                </span>
                <span className="flex space-x-2 items-center">
                <StatusBadge status={outpass.status} />
                <Badge className={outpass.isOut ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}>
                  {outpass.isOut ? 'Out' : 'In'}
                </Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <div className="flex ">
            <CardContent className="pt-4">
            <div className="flex items-center mb-2">
                <NotebookPen  className="mr-2"/>
                <span className="font-semibold ">Roll Number:</span>
                <span className="ml-2 text-2xl font-semibold">{outpass.rollNumber.split("@")[0]}</span>
              </div>
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
              {outpass.reason === 'home' && outpass.place && (
                <div className="flex items-center mb-2">
                  <Home className="mr-2" />
                  <span className="font-semibold">Place:</span>
                  <span className="ml-2">{outpass.place}</span>
                </div>
              )}
              <div className="mt-4">
                
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 justify-center">
            <Button 
              onClick={() => handleStatusUpdate('approved')} 
              disabled={outpass.status === 'approved' || isUpdating}
              variant="success"
            >
              Approve
            </Button>
            <Button 
              className="px-6"
              onClick={() => handleStatusUpdate('rejected')} 
              disabled={outpass.status === 'rejected' || isUpdating}
              variant="destructive"
            >
              Reject
            </Button>
            </CardFooter>
            </div>
          </Card>
  );
}