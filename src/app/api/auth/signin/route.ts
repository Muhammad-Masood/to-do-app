import { signInWithEmailAndPassword,updateProfile,getAuth } from "firebase/auth";
import { app, auth } from "../../../../../firebase_app";
import { NextResponse } from "next/server";

type SignInRequestBody = {
    email: string;
    password: string
}

export async function POST(request:Request){
    try{
        // const defAuth = getAuth();
        const body = await request.json() as SignInRequestBody;
        const user = await signInWithEmailAndPassword(auth,body.email,body.password);
        return NextResponse.json(user.user,{status:200});
    } catch(error){
        console.log(error);
    }
}
