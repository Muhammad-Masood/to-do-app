import { ToDoActionCard } from "@/components/TodoActionCard";
import React, { createContext, useState } from "react";

export type ToDoData = {
    title:string;
    date:Date;
    desc:string
}

export const ToDoContext = createContext<any>({});

export function ToDoContextProvider({children}:{children:React.ReactNode}){
    const [data,setData] = useState<ToDoData>({title:"",date:new Date(),desc:""});
    return(
        <div>
            <ToDoContext.Provider value={{data,setData}}>
            {children}
            </ToDoContext.Provider>
        </div>
    )
}