import { ToDoActionCard } from "@/components/TodoActionCard";
import React, { createContext, useState } from "react";

export type ToDoData = {
    id:string;
    title:string;
    date:string;
    desc:string
}

export const ToDoContext = createContext<any>({});

export function ToDoContextProvider({children}:{children:React.ReactNode}){
    const [data,setData] = useState<ToDoData>({id:"", title:"",date:new Date().toJSON(),desc:""});
    return(
        <div>
            <ToDoContext.Provider value={{data,setData}}>
            {children}
            </ToDoContext.Provider>
        </div>
    )
}