"use client"

import { Action, ToDoActionCard} from "@/components/TodoActionCard";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ToDoContext } from "@/provider/context";
import axios from "axios";
import { useContext } from "react";

const page = ({ params }: { params: {action:Action}}) => {
  const {data} = useContext(ToDoContext);
  const {title,date,desc} = data;
  const { toast } = useToast();

  const handleTodo = () => {
    axios
      .post("/api/todo", { title, date, desc })
      .then((response) => {
        toast({
          message: "Assigned To Do!",
          description: "To do assigned successfully.",
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Oops! something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <ToDoActionCard props={{action:params.action}}/>
      <Button onClick={handleTodo}>{params.action==="assign"?"Assign":"Update"}</Button>
    </div>
  );
};

export default page;