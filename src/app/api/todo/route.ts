import { NextResponse } from "next/server";


type ToDoRequestBody = {
    title:string,
    date:Date,
    desc:string
}

export async function POST(request:Request){
    try{
        // const defAuth = getAuth();
        const body = await request.json() as ToDoRequestBody;
        console.log(body.title,body.date,body.desc);
        return NextResponse.json({status:200});
    } catch(error){
        console.log(error);
    }
}

export async function GET(){
    try{
        //fetch todos from the db
        return NextResponse.json({});
    } catch(error){
        console.log(error);
    }
}