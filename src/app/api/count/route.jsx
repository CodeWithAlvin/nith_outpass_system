import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db/db"
import { visit } from "@/lib/db/schema"
import { sql,eq,gt } from 'drizzle-orm';
import { addDays } from "date-fns"

export const GET = auth(async function GET(req) {
    const totalStudent = process.env.TOTAL_STUDENT;
    try{
        const studentAbsent = await db.select({studentAbsent: sql`count(visit.email)`}).from(visit).where(eq(visit.isOut, true));
        const studentCommingLater = await db.select({studentCommingLater: sql`count(visit.email)`}).from(visit).where(gt(visit.to, new Date()));
        const studentCommingAfterTommorow = await db.select({studentCommingAfterTommorow: sql`count(visit.email)`}).from(visit).where(gt(visit.to,addDays(new Date(),1)));
        return NextResponse.json({
            studentPresent: totalStudent - studentAbsent[0].studentAbsent,
            studentExpected: totalStudent - studentCommingLater[0].studentCommingLater,
            studentExpectedTommorow :totalStudent - studentCommingAfterTommorow[0].studentCommingAfterTommorow
        })
    }catch(e){
        console.log(e)
        return NextResponse.json({message: "Some server side error occured"}, { status: 500 })
    }
})