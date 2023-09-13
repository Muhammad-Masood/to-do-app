"use client";
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
  const [todoData, setTodoData] = useState<ToDoData[]>([]);
  const uid = useSearchParams().get("uid");

  useEffect(() => {
    axios
      .get(`/api/todo?uid=${uid}`)
      .then((response) => {
        console.log(response.data);
        setTodoData(response.data);
        console.log(todoData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p className="font-bold text-3xl tracking-wide">
        Welcome {params.username}!
      </p>
      {todoData.map((todo,i) => (
        <Sticker {...todo} key={i} />
      ))}
      <Link href={`/todo/${params.username}/assign?uid=${uid}`}>
        <div className="flex bg-teal-100 p-3 px-5 w-min rounded-full hover:bg-teal-200 duration-300">
          <span className="mr-2">Create</span>
          <PlusCircle />
        </div>
      </Link>
    </div>
  );
};

export default page;
