import { ToDoData } from "@/provider/context";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
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
import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Refresh } from "./Refresh";
import { useRouter } from "next/navigation";

const Sticker = ({
  stickerProps,
}: {
  stickerProps: { todo: ToDoData; username: string; uid: string | null, filterTodos: (id:string) => void };
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  // const router = useRouter();
  const { id, title, date, desc, bgColor } = stickerProps.todo;
  const { username, uid, filterTodos } = stickerProps;
  console.log(stickerProps);

  const handleDelete = () => {
    axios.delete(`/api/todo?uid=${uid}&id=${id}`).then((res) => {
      if(res){
        const {id} = res.data;
        toast({
          title: `Delete To Do!`,
          description: `To do deleted successfully.`,
          variant:"destructive",
        });
        filterTodos(id);
      }
    }).catch((error) => console.log(error));
  };
  // get the bg-color of sticker
  return (
    <div className="">
      <Link href={``}>
        <div
          className={`${bgColor} h-[200px] w-[250px] rounded-2xl shadow-slate-400 shadow-2xl hover:scale-105 duration-250 transition relative p-5`}
        >
          <div className="absolute right-2 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/todo/${username}/edit?uid=${uid}&id=${id}`}>
                  <DropdownMenuItem>
                    <Pencil className="pr-2"/><p>Edit</p></DropdownMenuItem>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger className="hover:bg-accent w-full">
                    <button className="text-sm focus:bg-accent px-2 py-1.5 items-center cursor-pointer flex"><Trash className="pr-2" /><p>Delete</p></button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your todo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p>{date}</p>
          <p>{title}</p>
          <p>{desc}</p>
        </div>
      </Link>
    </div>
  );
};

export default Sticker;
