"use client"
import { useSession } from "next-auth/react";
import AdminNavbar from "@/components/Admin-navbar"
import NotAuthenticated from "@/components/not-authenticated"
import GuardTab from "@/components/GuardTab"
import MMCATab from "@/components/MMCATab"
import { FilterBar, FilterOptions } from '@/components/filterbar';
import { useEffect, useState } from 'react';
import { formatDate } from "@/lib/utils";

export default  function Home() {
  const { data: session,status } = useSession()

  const [outpasses, setOutpasses] = useState([])
  const [filteredOutpasses, setFilteredOutpasses] = useState([]);
  const [filters, setFilters] = useState({
    passType: 'all',
    dateIssued: '',
    rollNumber: '',
    status: 'all',
    isOut: 'all',
  });

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    async function fetchData() {
      const response = await fetch('/api/passes')
      const data = await response.json()
      if (response.ok) {
        setOutpasses(data)
        setFilteredOutpasses(data)
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    const filtered = outpasses.filter((outpass) => {
      return (
        (filters.passType === 'all' || outpass.reason === filters.passType) &&
        (filters.dateIssued === '' || formatDate(outpass.dateFilled,"yyyy-mm-dd") === filters.dateIssued) &&
        (filters.rollNumber === '' || outpass.rollNumber.includes(filters.rollNumber)) &&
        (filters.status === 'all' || outpass.status === filters.status) &&
        (filters.isOut === 'all' || outpass.isOut === (filters.isOut === 'true'))
      );
    });
    setFilteredOutpasses(filtered);
  }, [filters, outpasses]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (status === "unauthenticated"){
    return <NotAuthenticated url="/dashboard/auth"/>
  }
  if (status === "loading"){
    return  <div className="flex justify-center items-center text-2xl font-bold w-screen h-screen animate-pulse bg-neutral-100 dark:bg-neutral-800">loading...</div>
  }
  if (!(session?.user?.role === "guard" ||  session?.user?.role === "mmca")) {
    return <NotAuthenticated url="/dashboard/auth"/>
  }
  return (
    <>
      <AdminNavbar/>
      <div className="flex flex-col md:flex-row gap-6 max-w-screen">
        <div className="md:w-1/4 ">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        <div className="md:w-3/4">
          <div className="space-y-6 overflow-y-scroll h-[calc(100vh-80px)]">
          {session?.user?.role === "guard" ? <GuardTab filteredOutpasses={filteredOutpasses} setOutpasses={setOutpasses} /> : <MMCATab filteredOutpasses={filteredOutpasses} setOutpasses={setOutpasses}/>}
          </div>
        </div>
      </div>
    </>
  );
}


