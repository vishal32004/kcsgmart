"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/helpers/apiActions";
import { useStore } from "@/store/store";
import { toast } from "sonner";
import { User } from "@/types/Auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const isLoggedIn = useStore((state) => state.isLoggedIn);

  
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/"); // or dashboard
    }
  }, [isLoggedIn, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const user = data?.User;
      console.log("User Data", user);

      if (!user || !user.id) {
        toast.error("Login failed: Invalid user response");
        return;
      }

      setUser(user as User);
      toast.success("Login successful!");
      router.push("/");
    },

    onError: (error) => {
      console.error("Login error:", error); // 👈 Log the error
      setError(error.message || "An error occurred during login");
      toast.error(`Login failed: ${error?.message}`);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    mutation.mutate(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen mt-5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Log In"}
              </Button>
            </form>
            {mutation.error && (
              <p className="text-red-500 mt-2">{mutation.error.message}</p>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button variant="link" className="px-0 text-sm text-gray-600">
            Forgot your password?
          </Button>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}


// This code is a Next.js page for a login form. It uses React Hook Form for form handling, Zod for validation, and TanStack Query for API calls. The form includes fields for email and password, with validation messages displayed as needed. Upon successful login, user data is stored in a global state using Zustand, and the user is redirected to the home page. Error handling is implemented to display appropriate messages in case of login failure.