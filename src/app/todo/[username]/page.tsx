"use client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Action } from "@/components/TodoActionCard";
import Sticker from "@/components/Sticker";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase_app";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ToDoData } from "@/provider/context";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const page = ({ params }: { params: { username: string } }) => {
  const [todoData, setTodoData] = useState<ToDoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const uid = useSearchParams().get("uid");


  const handleDelete = () => {
    axios
      .delete(`/api/todo?uid=${uid}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/todo?uid=${uid}`)
      .then((response) => {
        setTodoData(response.data);
        console.log(todoData);
      })
      .catch((error) => {
        console.log(error);
      });
      setIsLoading(false);
      onAuthStateChanged(auth, (user) => {
        if(user) {
          console.log(user);
        } else {
          console.log("user not foiund :/");
        };
      });
  }, []);

  const filterTodos = (id: string) => {
    const filteredTodos = todoData.filter((todo) => todo.id !== id);
    setTodoData(filteredTodos);
  }

  return (
    <div className="relative min-h-screen">

      <div className="space-y-9">
        <div className="flex justify-between items-center">
          <p className="font-bold text-3xl tracking-wide text">
            Welcome {params.username}!
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete All</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  of your todos which can not be recovered later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ): ''}
        {todoData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 space-y-9 items-baseline justify-stretch">
            {todoData.map((todo, i) => (
              <Sticker
                stickerProps={{ todo, username: params.username, uid, filterTodos}}
                key={i}
              />
            ))}
          </div>
        ) : (
          <p className="font-bold text-5xl text-center pt-52 opacity-30 tracking-wider">NO TODOS!</p>
        )}

      </div>
      <Link href={`/todo/${params.username}/assign?uid=${uid}`}>
        <div className="fixed right-10 z-50 bottom-10">
          <div className="flex bg-teal-100 p-3 px-5 w-min rounded-full hover:bg-teal-200 duration-300 right-0">
            <span className="mr-2">Create</span>
            <PlusCircle />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default page;
