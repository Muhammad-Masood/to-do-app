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
import { ToDoContext } from "@/provider/context";
import { useContext } from "react";

export type Action = "assign" | "edit" | "read";

export function ToDoActionCard({ props }: { props: { action: Action } }) {
  const { action } = props;
  const { data, setData } = useContext(ToDoContext);
  const { title, date, desc } = data;
  return (
    <div>
      <p className="font-bold text-3xl tracking-wide pb-5">Assign a ToDo</p>
      <div className="w-full flex flex-col items-center space-y-3">
        <p className="text-base font-semibold text-center">Title</p>
        <Input
          type="text"
          placeholder="Developer meeting"
          className="text-center max-w-lg"
          value={title}
          onChange={(e) => setData(...data, { title: e.target.value })}
        ></Input>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
            <Select
              onValueChange={(value) =>
                setData(...data, { date: addDays(new Date(), parseInt(value)) })
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
              <Calendar mode="single" selected={date} onSelect={setData} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>Description</div>
    </div>
  );
}
