"use client"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import {redirect} from "next/navigation";

const SignUpFormSchema = z.object({
  username: z.string().min(3,{message:"Enter valid username"}),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1,{message:"Email is required"}),
  password: z.string().min(4,{ message: "Password must be at leat 4 characters." }).max(30),
});

export function SignUpForm() {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    axios.post('/api/auth/signup', values).then((response) => {
      toast({
        title:"Sign Up Successfull",
        description:"Account created successfully.",
      });
      console.log(response);
      redirect("/auth/signin");
    })
    .catch(error=>console.log(error));
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-4xl text-center font-bold">Sign Up</p>
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="xyz" {...field} />
                </FormControl>
                <FormMessage/>
                <FormDescription>
                This will be your public username
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="xyz@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <div className="flex gap-x-2">
            <p>Already have an account? </p>
            <Link href="/auth/signin" className="text-blue-500 font-semibold">Sign In</Link>
        </div>
        </form>
      </Form>
    </div>
  );
}
