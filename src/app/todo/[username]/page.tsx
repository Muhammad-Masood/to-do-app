"use client"
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Action } from "@/components/TodoActionCard";
import Sticker from "@/components/Sticker";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase_app";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ToDoData } from "@/provider/context";


const page = ({ params }: { params: { username: string } }) => {
  const [todoData, setTodoData] = useState<ToDoData>({title:"",date:new Date(),desc:""});

  useEffect(() => {
    axios.get('/api/todo/').then((response) => {
      setTodoData(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[]);
  
  return (
    <div>
      <p className="font-bold text-3xl tracking-wide">
        Welcome {params.username}!
      </p>
      <Link href={`/todo/${params.username}/assign?uid=${useSearchParams().get('uid')}`}>
        <Sticker {...todoData}/>
        <div className="flex bg-teal-100 p-3 px-5 w-min rounded-full hover:bg-teal-200 duration-300">
          <span className="mr-2">Create</span>
          <PlusCircle />
        </div>
      </Link>
    </div>
  );
};

export default page;
