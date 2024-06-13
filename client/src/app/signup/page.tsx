"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import User from "@/Models/userModels";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  useEffect(() => {
    if (session?.user?.email !== undefined && session?.user?.email) {
      setUser({
        username: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        password: "",
      });
      router.push("/signup");
    }
  }, [session]);

  const [loading, isLoading] = useState(false);

  const onSignup = async () => {
    try {
      isLoading(true);
      const response = await axios.post("/api/auth/signup", user);
      console.log("request received");
      if (
        session?.user?.email !== undefined &&
        session?.user?.email &&
        status == "authenticated"
      ) {
        setUser({
          username: session?.user?.name ?? "",
          email: session?.user?.email ?? "",
          password: "",
        });
        User.insertMany(user);
        router.push("/login");
      }
      console.log("signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      isLoading(false);
    } else {
      isLoading(true);
    }
  }, [user]);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="https://picsum.photos/200"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="https://picsum.photos/200"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/*<div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>*/}
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      signIn("github", {
                        callbackUrl: "http://localhost:3000/jobs",
                      })
                    }
                  >
                    {loading ? (
                      <Image
                        src="/github.svg"
                        className="mr-2 h-4 w-4"
                        alt="github"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        src="/googlecloudspanner.svg"
                        className="mr-2 h-4 w-4 animate-spin"
                        alt="loading"
                        width={30}
                        height={30}
                      />
                    )}{" "}
                    Github
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "http://localhost:3000/jobs",
                      })
                    }
                  >
                    {loading ? (
                      <Image
                        src="/google-color.svg"
                        className="mr-2 h-4 w-4"
                        alt="google"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        src="/googlecloudspanner.svg"
                        className="mr-2 h-4 w-4 animate-spin"
                        alt="loading"
                        width={30}
                        height={30}
                      />
                    )}{" "}
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">UserName</Label>
                  <Input
                    id="name"
                    type="test"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => onSignup()}
                  disabled={loading}
                >
                  Create account
                </Button>
              </CardFooter>
            </Card>
          </div>
          <p className="px-8 py-5 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
