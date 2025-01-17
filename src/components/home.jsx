"use client";
import { Container } from "@/components/container";
import {Button} from "@/components/ui/button";
import { useState,useEffect } from "react";
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {saveVisitAction} from "@/lib/actions"
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from 'lucide-react'
 
export default  function PassTab() {
    const [passType, setPassType] = useState("home");
    const [state,setState] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const router = useRouter()

    const [date, setDate] = useState({
        from: new Date(),
        to: addDays(new Date(), 2),
      })

    const [placeValue, setPlaceValue] = useState("")
    const handlePlaceChange = (e) => {
        setPlaceValue(e.target.value)
    }

    const saveAction = async () => {
       setState(false)
       setIsSubmiting(true)
       if (!placeValue || !date.from || !date.to) {
        setState({ success: false, message: "Please fill all fields" })
        setIsSubmiting(false)
        return 0
       }
       const response = await saveVisitAction(passType,date.from,date.to,placeValue);
       if (response.success){
        router.push("/history")
       }
       setState(response)
       setIsSubmiting(true)
    }
    return (
        <Container className="flex-col sm:pl-20 mb-16 h-max py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">KBH Out Pass System</h1>
            <p className="text-gray-500 text-center">Generate Home Pass and Market Pass for KBH Hostel</p>
            <div className="flex flex-row justify-between space-x-10 mt-10">
                <Button variant={passType=="home"?"default":"secondary"} onClick={() => setPassType("home")}>
                <HomeIcon className={passType=="home"?"invert":""}/>
                <p className="ml-2">Home Pass</p>
                </Button>
                <Button variant={passType=="market"?"default":"secondary"} onClick={() => setPassType("market")}>
               <MarketIcon className={passType=="market"?"invert":""}/>
                <p className="ml-2"> Market Pass</p>
                </Button>
            </div>
            {
                passType=="home"?
                <div className="flex flex-col space-y-4 mt-12">
                    <div className={cn("grid gap-2")}>
                        <Popover>
                        <Label htmlFor="date">Dates</Label>
                            <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="pr-2" />
                                {date?.from ? (
                                date.to ? (
                                    <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                                ) : (
                                <span>Pick a date</span>
                                )}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={1}
                            />
                            </PopoverContent>
                        </Popover>
                        </div>
                        <Label htmlFor="place">Place</Label>
                        <Input id="place" type="text" placeholder="Going to" value={placeValue} onChange={handlePlaceChange} required />
                </div>
                :
                <div className="flex flex-col space-y-4 mt-4">
                  
                </div>
            }

            <Button className="mt-10" onClick={saveAction} disabled={isSubmiting}>Generate Pass</Button>
            {state && (
            <div className={`flex items-center mt-4 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
              {state.success ? <CheckCircle2 className="mr-2" /> : <AlertCircle className="mr-2" />}
              <p>{state.message}</p>
            </div>
          )}
        </Container>
    );
}

const HomeIcon = ({className}) =>{
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
        </svg>
    )
}

const MarketIcon = ({className}) =>{
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}