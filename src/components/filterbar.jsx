'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    passType: 'all',
    dateIssued: '',
    rollNumber: '',
    status: 'all',
    isOut: 'all',
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-200 h-full ">
      <div>
        <Label htmlFor="passType">Pass Type</Label>
        <Select
          onValueChange={(value) => handleFilterChange('passType', value)}
          value={filters.passType}
        >
          <SelectTrigger id="passType">
            <SelectValue placeholder="Select pass type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="home">Home</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dateIssued">Date Issued</Label>
        <Input
          id="dateIssued"
          type="date"
          value={filters.dateIssued}
          onChange={(e) => handleFilterChange('dateIssued', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input
          id="rollNumber"
          type="text"
          value={filters.rollNumber}
          onChange={(e) => handleFilterChange('rollNumber', e.target.value)}
          placeholder="Search by roll number"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => handleFilterChange('status', value)}
          value={filters.status}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="isOut">In/Out</Label>
        <Select
          onValueChange={(value) => handleFilterChange('isOut', value)}
          value={filters.isOut}
        >
          <SelectTrigger id="isOut">
            <SelectValue placeholder="Select in/out" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Out</SelectItem>
            <SelectItem value="false">In</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

