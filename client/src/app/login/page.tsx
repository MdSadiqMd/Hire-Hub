"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // from "next Navigation"
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";

// ***In app directory we need to create a folder for every page and a file with name of "page.tsx" only then the nextJS will create that page without neccessarly us needed to create route for that page
// If we give any name other than page.tsx tha app crashes
// Don't Need to bother about routes this page inside app will automatically create a route no manually route creating steps required
const LoginPage = () => {
  const router=useRouter();
  const [user,setUser]=React.useState({
    email:"",
    password:"",
  });

  const onLogin=async()=>{
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login Sucess",response.data);
      router.push("/profile")
    } catch(error:any){
      console.log("login failed");
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  {/*return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading?"Loading":"Login page"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"Fill up all feilds":"Login"}</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    </div>
  )*/}
  


  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
        <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
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
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
          <Button disabled={isLoading} onClick={onLogin}>
            {isLoading && (
              <Icons imageLink="https://icons8.com/icon/xS10HpCgrmSD/fidget-spinner" className="mr-2 h-4 w-4 animate-spin" />
            )}
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons imageLink="https://icons8.com/icon/xS10HpCgrmSD/fidget-spinner" className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons imageLink="https://icons8.com/icon/17949/google" className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}

export default LoginPage