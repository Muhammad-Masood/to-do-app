import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Action } from "@/components/TodoActionCard";

const page = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <p className="font-bold text-3xl tracking-wide">
        Welcome {params.username}!
      </p>
      <Link href={`/todo/${params.username}/assign`}>
        <div className="flex bg-teal-100 p-3 px-5 w-min rounded-full">
          <span className="mr-2">Create</span>
          <PlusCircle />
        </div>
      </Link>
    </div>
  );
};

export default page;
