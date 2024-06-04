"use client";
import className from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { data: session, status } = useSession();
  console.log(session);
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        email: session.user.email ?? "",
        password: "",
      });
    }
    router.push("/jobs");
  }, [session]);

  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      if (!user.email || !user.password) {
        toast.error("Please fill all feilds");
      }
      setIsLoading(true);
      /* await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: "/jobs",
      }); */
      const response = await axios.post("/api/auth/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Successfull");
      router.push("/jobs");
    } catch (error: any) {
      console.log("Login failed");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  interface Metadata {
    title: string;
    description: string;
  }

  const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
  };

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signup"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          signIn
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
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div className={cn("grid gap-6", className)}>
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      password
                    </Label>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                  <Button disabled={isLoading} onClick={() => onLogin()}>
                    Sign In with Email
                  </Button>
                </div>
              </form>
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
              <div className="flex flex-col space-y-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signIn("google")}
                >
                  {!isLoading ? (
                    <Image
                      src="/google-color.svg"
                      className="mr-2 h-4 w-4 "
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
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signIn("github")}
                >
                  {!isLoading ? (
                    <Image
                      src="/github.svg"
                      className="mr-2 h-4 w-4 "
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
              </div>
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
      </div>
    </>
  );
};

export default LoginPage;
