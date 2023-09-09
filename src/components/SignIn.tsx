"use client";
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
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at leat 4 characters." })
    .max(30),
});

export function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    axios
      .post("/api/auth/signin", values)
      .then((response) => {
        console.log(response);
        router.push(`/todo/${response.data.displayName}`);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Sign In Error",
          description: "Invalid email or password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.log(error);
      });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <p className="text-4xl text-center font-bold">Sign In</p>
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
            <p>Don&apos;t have an account? </p>
            <Link href="/auth/signup" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
