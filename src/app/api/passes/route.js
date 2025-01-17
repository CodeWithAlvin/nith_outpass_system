import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db/db"
import { visit } from "@/lib/db/schema"
import { desc,sql } from 'drizzle-orm';

export const GET = auth(async function GET(req) {
  if (req.auth &&( req.auth.user.role === "guard" || req.auth.user.role === "mmca")) {
  	try{
	  	const result = await db.select(
			{
				rollNumber: visit.email,
				dateFilled: visit.date,
				reason: visit.reason,
				status: visit.status,
				isOut: visit.isOut,
				fromDate: visit.from,
				toDate: visit.to,
				place: visit.place,
				id: visit.id
			}
		).from(visit).orderBy(desc(visit.date));
      return NextResponse.json(result)
  	}catch(e){
		console.log(e)
  		return NextResponse.json({message: "Some server side error occured"}, { status: 500 })
  	}
  }
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})