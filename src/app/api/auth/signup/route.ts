import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import bcrypt from "bcrypt";
import { app, auth } from "../../../../../firebase_app";
import admin from "firebase-admin"


type SignUpRequestBody = {
    username:string;
    email: string;
    password: string;
};

// User Signup/Create new user
export async function POST(request:Request) {
    try{
        const body = await request.json() as SignUpRequestBody;
        const userCredentials = await createUserWithEmailAndPassword(auth,body.email,body.password);
        await updateProfile(userCredentials.user,{displayName:body.username})
        return NextResponse.json({user:userCredentials.user},{status:200});
    } catch(error){
        console.log(error);
    }
}
