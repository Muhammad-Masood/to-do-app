import { ToDoActionCard } from "@/components/TodoActionCard";
import { createContext, useState } from "react";

type ToDoData = {
    title:string;
    date:Date;
    desc:string
}

export const ToDoContext = createContext<any>(null);

export function ToDoContextProvider({children}:{children:React.ReactNode}){
    const [data,setData] = useState<ToDoData>({title:"",date:new Date(),desc:""});

    return(
        <div>
            <ToDoContext.Provider value={{data,setData}}>
            <ToDoActionCard props={{action:"read"}}/>
            </ToDoContext.Provider>
        </div>
    )
}