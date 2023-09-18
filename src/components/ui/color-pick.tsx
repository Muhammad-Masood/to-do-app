"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { colors } from "@/lib/utils"
import { ToDoContext } from "@/provider/context"

export function ColorPick() {
    const {data,setData} = React.useContext(ToDoContext);
    const [color, setColor] = React.useState("");

    React.useEffect(() => {
        setData({...data, bgColor:color});
    },[color,setColor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${color}`}>Color</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Pick Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
          {
            colors.map((c,index) => (
                <DropdownMenuRadioItem value={c} key={index} className={`capitalize ${c}`}>{c.split('-')[1]}</DropdownMenuRadioItem>
            ))
          }
          
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
