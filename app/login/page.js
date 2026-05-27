"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  useRouter
} from "next/navigation";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "@/lib/firebase";
import toast from "react-hot-toast";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [pageReady, setPageReady] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setPageReady(true);

      }, 900);

    return () =>
      clearTimeout(timer);

  }, []);

  const loginUser =
    async () => {

      if (
        !email ||
        !password
      ) {

        toast.error(
          "Fill all details"
        );

        return;

      }

      try {

        setLoading(true);

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        localStorage.setItem(

        toast.success("Login Successful");
          "bharatp2pUser",
          email
        );

        router.push(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Invalid Email Or Password"
        );

      } finally {

        setLoading(false);

      }

    };

  if (
    !pageReady ||
    loading
  ) {

    return (

      <main className="fixed inset-0 bg-[#050816] flex items-center justify-center overflow-hidden z-[9999]">

        <div className="absolute w-[180px] h-[180px] bg-green-500/10 blur-3xl rounded-full" />

        <div className="text-center relative z-10 px-6">

          <div className="relative w-24 h-24 mx-auto">

            <div className="absolute inset-0 rounded-full border-[4px] border-green-400 border-t-transparent animate-spin shadow-[0_0_40px_#22c55e]" />

            <div className="absolute inset-[10px] rounded-full bg-[#020617] border border-white/10 flex items-center justify-center overflow-hidden">

              <div className="absolute inset-[5px] rounded-full border border-green-400/20" />

              <div className="flex items-center justify-center">

                <span className="text-green-400 text-[30px] font-black tracking-[-3px]">

                  BP

                </span>

                <span className="text-yellow-300 text-[30px] font-black -ml-1">

                  ⚡

                </span>

              </div>

            </div>

          </div>

          <h1 className="mt-6 text-3xl font-black text-white">

            BharatP2P

          </h1>

          <p className="text-gray-400 mt-2 text-sm">

            India Trusted Crypto Exchange

          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4 overflow-hidden relative">

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl overflow-hidden relative z-10">

        <Link href="/">

          <button className="text-green-400 text-xl mb-4">

            ← Back

          </button>

        </Link>

        <div className="flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.20)]">

            <div className="w-11 h-11 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center">

              <span className="text-green-400 text-xl font-black tracking-[-2px]">

                BP

              </span>

              <span className="text-yellow-300 text-xl font-black -ml-1">

                ⚡

              </span>

            </div>

          </div>

          <h1 className="text-3xl font-black mt-4 tracking-tight">

            BharatP2P

          </h1>

          <p className="text-center text-gray-400 mt-2 text-sm">

            Login To Continue

          </p>

        </div>

        <div className="mt-5 overflow-hidden rounded-[18px] border border-white/10 bg-[#0d1324] py-3">

          <div className="ticker-wrap">

            <div className="ticker">

              <span className="mx-5 text-green-400">

                ⚡ Instant P2P Settlement

              </span>

              <span className="mx-5 text-yellow-400">

                🔒 Trusted Exchange

              </span>

              <span className="mx-5 text-blue-400">

                💸 Fast Withdrawals

              </span>

              <span className="mx-5 text-pink-400">

                🟢 24/7 Live Support

              </span>

            </div>

            <div className="ticker">

              <span className="mx-5 text-green-400">

                ⚡ Instant P2P Settlement

              </span>

              <span className="mx-5 text-yellow-400">

                🔒 Trusted Exchange

              </span>

              <span className="mx-5 text-blue-400">

                💸 Fast Withdrawals

              </span>

              <span className="mx-5 text-pink-400">

                🟢 24/7 Live Support

              </span>

            </div>

          </div>

        </div>

        <style jsx>{`

          .ticker-wrap {

            display: flex;
            width: max-content;
            animation: ticker 25s linear infinite;

          }

          .ticker {

            display: flex;
            align-items: center;
            white-space: nowrap;
            flex-shrink: 0;
            font-weight: 900;
            font-size: 13px;

          }

          @keyframes ticker {

            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }

          }

        `}</style>

        {message && (

          <div className="mt-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[20px] p-3 text-center font-bold text-sm">

            {message}

          </div>

        )}

        <div className="mt-5 space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-4 rounded-[20px] bg-[#0d1324] outline-none border border-white/5 focus:border-green-400/30 text-sm"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-4 rounded-[20px] bg-[#0d1324] outline-none border border-white/5 focus:border-green-400/30 text-sm"
          />

        </div>

        <div className="flex justify-end mt-3">

          <Link href="/forgot-password">

            <button className="text-yellow-400 font-bold text-sm">

              Forgot Password?

            </button>

          </Link>

        </div>

        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full mt-5 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[20px] font-black text-sm shadow-xl shadow-green-500/20"
        >

          Login

        </button>

        <p className="text-center text-gray-400 mt-5 text-sm">

          Don’t have an account?

        </p>

        <Link href="/register">

          <button className="w-full mt-3 bg-white/5 border border-white/10 py-4 rounded-[20px] font-black text-sm">

            Register

          </button>

        </Link>

      </div>

    </main>

  );

}