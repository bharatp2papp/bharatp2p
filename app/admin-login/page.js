"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      email === "admin@bharatp2p.com" &&
      password === "bharat@2026"
    ) {

      localStorage.setItem(
        "adminLogged",
        "true"
      );

      router.push("/admin");

    } else {

      alert("Invalid Admin Login");

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-[#131c31] border border-white/10 rounded-[35px] p-7">

        <h1 className="text-5xl font-black text-center">

          Admin Login

        </h1>

        <p className="text-gray-400 text-center mt-3">

          BharatP2P Secure Access

        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            className="w-full bg-[#0d1324] rounded-2xl p-5 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            className="w-full bg-[#0d1324] rounded-2xl p-5 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-black py-5 rounded-2xl font-bold text-lg"
          >

            Login Admin

          </button>

        </div>

      </div>

    </main>

  );

}