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
import {
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  EyeOff,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { signUp } from "@/helpers/apiActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/store";

const formSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    Mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid mobile number.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const isLoggedIn = useStore((state) => state.isLoggedIn);

    useEffect(() => {
      if (isLoggedIn) {
        router.replace("/"); // or dashboard
      }
    }, [isLoggedIn, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      Mobile: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      router.push("/login");
      toast.success("Signup successful!");
    },
    onError: (error) => {
      setError(error.message || "An error occurred during signup");
      toast.error(`Signup failed: ${error?.message}`);
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setError(null);
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details below to sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="Mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Mobile
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input placeholder="john@example.com" {...field} />
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Confirm Password
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
                  {mutation.isPending ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who are already benefiting from our
            services. Sign up today and start your journey with us!
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              Easy to use interface
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              Secure and reliable
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              24/7 customer support
            </li>
          </ul>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
}
