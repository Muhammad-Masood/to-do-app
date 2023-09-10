"use client"
import { ToDoContextProvider } from '@/provider/context'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToDoContextProvider>
          <Navbar/>
        {children}
        </ToDoContextProvider>
        <Toaster/>
        </body>
    </html>
  )
}
