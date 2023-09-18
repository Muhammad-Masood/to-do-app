"use client";

import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ToDoContext, ToDoData } from "@/provider/context";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ColorPick } from "./ui/color-pick";

export type Action = "assign" | "edit" | "delete" |"read";

export function ToDoActionCard({ props }: { props: { action: Action, uid:string|null}}) {
  const { action,uid } = props;
  const { data, setData } = useContext(ToDoContext);
  const { title, date, desc } = data;
  const { toast } = useToast();
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    if(action==="edit"){
      axios.get(`/api/todo?uid=${uid}`).then((response) => console.log(response.data) ).catch(error => console.log(error))
    }
    setData({ ...data, date: calendarDate });
  },[calendarDate])

  const handleTodo = (action: Action) => {
    const url = `/api/todo?uid=${uid}`;
    const body = {data};
    
    const toastErrorMessage = toast({
      variant: "destructive",
      title: "Error",
      description: "Oops! something went wrong.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });

    if(action === "assign" || "edit"){
      const axiosMethod = action === "assign" ? axios.post : axios.patch;
      axiosMethod(url,body).then((response) => {
        toast({
          title: `${action} To Do!`,
          description: `To do ${action}ed successfully.`,
        });
        console.log(response);
      }).catch((error) => {
        console.log(error);
        toastErrorMessage;
      })
    } else if (action === "delete") {
      const axiosMethod = axios.delete;
      axiosMethod(url,body).then((response) => {
        toast({
          title: "Deleted To Do!",
          description: "To do assigned successfully.",
        });
        console.log(response);
      }).catch((error) => {
        console.log(error);
        toastErrorMessage;
      })
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 space-y-4">
      <div className="flex justify-between w-[500px]">
      <p className="font-bold text-3xl tracking-wide pb-5 capitalize">{action} a ToDo</p>
      <ColorPick/>
      </div>
        <Label className="text-center">Title</Label>
        <Input
          type="text"
          placeholder="Developer meeting"
          className="text-center max-w-lg"
          value={title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        ></Input>
      <div className="pt-2 pb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !calendarDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {calendarDate ? (
                format(calendarDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
            <Select
              onValueChange={(value) =>
                // setCalendarDate(addDays(new Date(), parseInt(value)))
                setData({...data,date:addDays(new Date(), parseInt(value))})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
        <Label htmlFor="message" className="text-center">Description</Label>
        <Textarea className="w-64" placeholder="Define your to-do here." id="message" onChange={(e) => setData({...data,desc:e.target.value})} />
      <Button onClick={() => handleTodo(action)}>
        {action === "assign" ? "Assign" : "Update"}
      </Button>
    </div>
  );
}
