import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase_app";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET({params}:{params:{id:string}},uid:string){
    try{
        const {id} = params;
        console.log("userId: ",uid,"todoId: ",id);
        const userToDoCollectionRef = collection(doc(db,"users",uid),"todos");
        const userTodoDocsSnapshot = await getDocs(userToDoCollectionRef);
        return NextResponse.json({status:201});
    } catch(error){
        console.log(error);
    }
}

export async function PATCH({params}:{params:{id:string}},uid:string){
    try{
        const {id} = params;
        console.log("userId: ",uid,"todoId: ",id);
        const userToDoCollectionRef = collection(doc(db,"users",uid),"todos");
        const userTodoDocsSnapshot = await getDocs(userToDoCollectionRef);
        return NextResponse.json({status:201});
    } catch(error){
        console.log(error);
    }
}