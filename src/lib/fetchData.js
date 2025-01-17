import {db} from "@/lib/db/db"
import {users,visit} from "@/lib/db/schema"
import {eq,desc,sql, gt}  from "drizzle-orm" 
import { addDays } from "date-fns"

export async function fetchUserDetails(email){
    try{
        const result = await db.select({
            phoneNumber: users.phoneNumber,
            parentsNumber: users.parentsNumber
        }).from(users).where(eq(users.email,email));
        return result[0]
      }catch (error){
        console.log(error )
        return { userDetailsError : "Unable to get userDetail. Please try again"}
      }
  
}
export async function fetchUserOutpasses(email){
    try{
        const result = await db.select({
            type: visit.reason,
            fromDate: visit.from,
            toDate: visit.to,
            status: visit.status,
            isOut: visit.isOut,
            place: visit.place
        }).from(visit).where(eq(visit.email,email)).orderBy((desc(visit.date)));
        return {outPassData:result}
      }catch (error){
        console.log(error )
        return { outpassesError : "Unable to get outpasses. Please try again"}
      }
  
}

export async function fetchStudentPresent(){
  const totalStudent = process.env.TOTAL_STUDENT;
    try{
        const studentAbsent = await db.select({studentAbsent: sql`count(visit.email)`}).from(visit).where(eq(visit.isOut, true));
        const studentCommingLater = await db.select({studentCommingLater: sql`count(visit.email)`}).from(visit).where(gt(visit.to, new Date()));
        const studentCommingAfterTommorow = await db.select({studentCommingAfterTommorow: sql`count(visit.email)`}).from(visit).where(gt(visit.to,addDays(new Date(),1)));
        return {
          studentPresent: totalStudent - studentAbsent[0].studentAbsent,
          studentExpected: totalStudent - studentCommingLater[0].studentCommingLater,
          studentExpectedTommorow :totalStudent - studentCommingAfterTommorow[0].studentCommingAfterTommorow
        }
      }catch (error){
        console.log(error )
        return { attendanceError : "Unable to get attendance. Please try again"}
      }
  
}