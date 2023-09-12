"use client"
import { Action, ToDoActionCard} from "@/components/TodoActionCard";
import { useSearchParams } from "next/navigation";

const page = ({ params }: { params: {action:Action}}) => {
  return (
    <div>
      <ToDoActionCard props={{action:params.action,uid:useSearchParams().get('uid') || null}}/>
    </div>
  );
};

export default page;