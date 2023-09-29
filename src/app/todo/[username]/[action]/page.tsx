"use client"
import { Action, ToDoActionCard} from "@/components/TodoActionCard";
import { getUid } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const page = ({ params }: { params: {action:Action}}) => {
  return (
    <div>
      <ToDoActionCard {...{action:params.action, uid: getUid(), todoId:useSearchParams().get('id')}}/>
    </div>
  );
};

export default page;