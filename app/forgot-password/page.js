"use client";

import { useState } from "react";

import Link from "next/link";

import {
  sendPasswordResetEmail
} from "firebase/auth";

import {
  auth
} from "@/lib/firebase";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [masterKey, setMasterKey] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const resetPassword =
    async () => {

    if (
      !email ||
      !masterKey
    ) {

      alert(
        "Fill all details"
      );

      return;

    }

    if (
      masterKey !==
      "BHARATP2P2026MASTER"
    ) {

      alert(
        "Invalid Master Key"
      );

      return;

    }

    try {

      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset link sent to your email"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Email not found"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[35px] p-8">

        <Link href="/login">

          <button className="text-green-400 text-2xl mb-5">

            ← Back

          </button>

        </Link>

        <h1 className="text-4xl font-black text-center">

          Forgot Password

        </h1>

        <p className="text-center text-gray-400 mt-3">

          Verify Master Key

        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-5 rounded-3xl bg-[#0d1324]"
          />

          <input
            type="text"
            placeholder="Enter Master Key"
            value={masterKey}
            onChange={(e)=>
              setMasterKey(
                e.target.value
              )
            }
            className="w-full p-5 rounded-3xl bg-[#0d1324]"
          />

        </div>

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full mt-8 bg-green-500 text-black py-5 rounded-3xl font-bold text-lg"
        >

          {loading
            ? "Please Wait..."
            : "Send Reset Link"}

        </button>

      </div>

    </main>

  );

}