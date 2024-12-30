"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import toast from "react-hot-toast";
import { signInWithSupabase } from "@/app/actions/aut";
import Input from "@/app/components/ui/input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      await signInWithSupabase({ email, password });
      toast.success("Signed in successfully!");
      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Error signing in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-main">Welcome Back</h2>
          <p className="mt-2 text-secondaryText">Sign in to MainFocus</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              disabled={isLoading}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-secondaryText">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-main hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
