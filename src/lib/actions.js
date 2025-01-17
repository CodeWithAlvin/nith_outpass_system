"use server"
import { signIn,auth  } from "@/lib/auth"
import { z } from "zod"
import {db} from "@/lib/db/db"
import {visit,users} from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// // zod schemas
// const saveVisitSchema = z.object({
//     reason: z.enum(["market", "home"]),
//     from: z.datetime({ message: "Invalid datetime string! Must be UTC." }),
//     to: z.datetime({ message: "Invalid datetime string! Must be UTC." }),
//     place: z.string()
// })

// server actions
export async function signInAction(){
    await signIn("google", { redirectTo: '/'})
}

export async function doCredentialsSignIn(formData){
    try{
        let response = await signIn("credentials", {
            username: formData.get('username'),
            password: formData.get('password'),
            redirect: false
        })
        return { success: true, ...response }
    }catch(e){
        console.log(e)
       return { success: false, message: "Invalid Username or Password" }
    }
    
}

export async function saveVisitAction(reason,from,to,place) {
    const session = await auth() 
    const email = session.user.email
    // const validatedFields = saveVisitSchema.safeParse({
    //     reason,
    //     from,
    //     to,
    //     place
    // })

    // console.log(validatedFields.error.flatten().fieldErrors)

    // if (!validatedFields.success){
    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //     }
    // }

    // update to database table user
    try{
        await db.insert(visit).values({
            email: email,
            from: from,
            to: to,
            reason: reason,
            status: "pending",
            place: place
        })
        return { 
            success: true,
            message:"outpass generated succesfully"
        }
    }catch(e){
        console.log(e)
        return {
            success:false,
            message: "an error occured when saving data to database."
        }
    }

   
}

const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')

const FormSchema = z.object({
  userPhone: phoneNumberSchema,
  parentPhone: phoneNumberSchema,
})

export async function submitPhoneNumbers(formData) {
    const session = await auth() 
    const email = session.user.email
    console.log(formData)
    const validatedFields = FormSchema.safeParse({
        userPhone: formData.get('userPhone'),
        parentPhone: formData.get('parentPhone'),
    })

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid phone numbers. Please check and try again.' }
    }

   try{
        await db.update(users).set({
            phoneNumber: validatedFields.data.userPhone ,
            parentsNumber: validatedFields.data.parentPhone ,
        }).where(eq(users.email,email))
        return { 
            success: true
        }
    }catch(e){
        console.log(e)
        return {
            errors: "an error occured when saving data to database."
        }
    }
}

export async function updateOutpassStatus(outpassId, newStatus) {
    const session = await auth() 
    const role = session.user.role 

    if (role !== "mmca"){
        return { success: false, message: "You are not authorized to perform this action." }
    }
   
    if (newStatus === "approved"){
        await db.update(visit).set({
            status: newStatus,
            isOut: true
        }).where(eq(visit.id,outpassId))
    }else if (newStatus === "rejected"){
        await db.update(visit).set({
            status: newStatus,
            isOut: false
        }).where(eq(visit.id,outpassId))
    }
    
    revalidatePath("/dashboard")
    return { success: true, message: `Outpass ${outpassId} updated successfully` };
  }
  

  export async function closeEntryAction(outpassId) {
    const session = await auth() 
    const role = session.user.role 

    if (role !== "guard"){
        return { success: false, message: "You are not authorized to perform this action." }
    }
    
    await db.update(visit).set({
        isOut: false
    }).where(eq(visit.id,outpassId))
    
    revalidatePath("/dashboard")
    return { success: true, message: `Outpass ${outpassId} updated successfully` };
  }
  