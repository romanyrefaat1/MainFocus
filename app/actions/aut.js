"use server";
import { supabase } from "@/app/lib/supabase";
import toast from "react-hot-toast";
import { cookies } from 'next/headers'
import { validateEmail } from "../lib/validators";

export async function signInWithSupabase({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export async function signUpUser(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Validation
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address" }
  }

  if (password.length < 6) {
    return { error: "Password should be at least 6 characters" }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/signin`,
      },
    })

    if (error) {
      if (error.message.includes("rate_limit")) {
        return { error: "Please wait a moment before trying again" }
      }
      throw error
    }

    if (data?.user?.identities?.length === 0) {
      return { error: "An account with this email already exists" }
    }

    return { 
      success: "Account created! Please check your email to confirm your account.",
      data 
    }

  } catch (error) {
    console.error("Sign up error:", error)
    return { error: error.message || "Error creating account" }
  }
}
