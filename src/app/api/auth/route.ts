import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase_app";

type SignUpRequestBody = {
  email: string;
  password: string;
};

// User Signup/Create new user
export async function POST(request:Request) {
    try{
        const body = await request.json() as SignUpRequestBody;
        const userCredentials = await createUserWithEmailAndPassword(auth,body.email,body.password);
    } catch(error){
        console.log(error);
    }
} 
