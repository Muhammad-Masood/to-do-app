import { signInWithEmailAndPassword,updateProfile,getAuth, onAuthStateChanged } from "firebase/auth";
import {  auth } from "../../../../../firebase_app";
import { NextResponse } from "next/server";

type SignInRequestBody = {
    email: string;
    password: string
}

export async function POST(request:Request){
    try{
    // const defAuth = getAuth();
        const body = await request.json() as SignInRequestBody;
        console.log(body.email,body.password);
        const user = await signInWithEmailAndPassword(auth,body.email,body.password);
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log(user);
            } else{
                console.log("no user from api");
            }
        })
        return NextResponse.json(user.user,{status:200});
    } catch(error){
        console.log(error);
    }
}
