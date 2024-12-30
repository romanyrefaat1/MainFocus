"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpUser } from "@/app/actions/aut";
import { Button } from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadin, setIsLoadin] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsLoadin(true);
    try {
      const result = await signUpUser(formData);

      if (result.error) {
        toast.error(result.error, {
          duration: 4000,
          position: "top-center",
        });
        setIsLoadin(false)
        return;
      }

      setIsLoadin(false);

      toast.success(result.success, {
        duration: 4000,
        position: "top-center",
      });

      // Redirect after successful signup
      router.push("/signin");
    } finally {
      // Reset submitting state after 30 seconds
      setTimeout(() => setIsSubmitting(false), 30000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-back p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Create Account</h2>
          <p className="mt-2 text-secondaryText">Sign up for MainFocus</p>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              disabled={isSubmitting}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={6}
              disabled={isSubmitting}
            />
            <p className="text-sm text-secondaryText">
              Password must be at least 6 characters long
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : "Sign Up"}
          </Button>

          <p className="text-center text-secondaryText">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              {isLoadin ? `Sign In` : <LoaderIcon />}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
