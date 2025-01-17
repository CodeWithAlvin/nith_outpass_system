"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function StudentMetrics() {
  const [studentCount, setStudentCount] = useState({studentPresent: 0, studentExpected: 0, studentExpectedTommorow: 0})

  useEffect(() => {
      // In a real application, you would fetch this data from an API
      async function fetchData() {
        const response = await fetch('/api/count')
        const data = await response.json()
        if (response.ok) {
          setStudentCount(data)
        }
      }
      fetchData();
    }, []);

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Student Attendance Metrics</h1>
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Students Present"
              value={studentCount.studentPresent}
              icon={Users}
              description="Number of students in attendance today"
            />
            <MetricCard
              title="Expected Students"
              value={studentCount.studentExpected}
              icon={CalendarDays}
              description="Total number of students expected today"
            />
          </div>
        </TabsContent>
        <TabsContent value="tomorrow">
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Expected Students"
              value={studentCount.studentExpectedTommorow}
              icon={CalendarDays}
              description="Total number of students expected tomorrow"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


function MetricCard({ title, value, icon: Icon, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

