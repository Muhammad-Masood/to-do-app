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
import { MoreVertical } from "lucide-react";
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

const Sticker = ({
  stickerProps,
}: {
  stickerProps: { todo: ToDoData; username: string; uid: string | null };
}) => {
  const { title, date, desc, bgColor } = stickerProps.todo;
  const { username, uid } = stickerProps;
  console.log(stickerProps);

  const handleDelete = () => {};
  // get the bg-color of sticker
  return (
    <div>
      <Link href={``}>
        <div
          className={`bg-slate-500 h-[200px] w-[250px] rounded-2xl shadow-slate-700 shadow-2xl hover:scale-105 duration-250 transition relative`}
        >
          <div className="absolute right-2 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/todo//${username}/edit?uid=${uid}`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                  <DropdownMenuItem className="">
                    Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p>{title}</p>
          <p>{desc}</p>
        </div>
      </Link>
    </div>
  );
};

export default Sticker;
