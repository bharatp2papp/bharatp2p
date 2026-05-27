"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

export default function AboutPage() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 900);

    return () =>
      clearTimeout(timer);

  }, []);

  if (loading) {

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

    <main className="min-h-screen bg-[#050816] text-white p-4 overflow-hidden relative">

      {/* GLOW */}

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="max-w-sm mx-auto relative z-10">

        {/* TOP CARD */}

        <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <Link href="/dashboard">

              <button className="text-2xl text-green-400">

                ←

              </button>

            </Link>

            <div className="w-14 h-14 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.20)]">

              <span className="text-green-400 text-xl font-black tracking-[-2px]">

                BP

              </span>

              <span className="text-yellow-300 text-xl font-black -ml-1">

                ⚡

              </span>

            </div>

            <div className="w-8" />

          </div>

          <h1 className="text-3xl font-black text-center mt-5">

            About BharatP2P

          </h1>

          <p className="text-center text-gray-400 mt-2 text-sm leading-6">

            India's trusted premium P2P USDT exchange platform.

          </p>

        </div>

        {/* HERO */}

        <div className="mt-4 bg-gradient-to-br from-green-500/20 to-green-700/10 border border-green-500/20 rounded-[28px] p-5 backdrop-blur-xl">

          <h2 className="text-2xl font-black leading-tight">

            Fast • Secure • Trusted

          </h2>

          <p className="text-gray-300 mt-4 text-sm leading-7">

            BharatP2P provides secure and fast peer-to-peer USDT trading for Indian users with smooth deposits, trusted payment methods and premium trading experience.

          </p>

        </div>

        {/* FEATURES */}

        <div className="mt-4 space-y-3">

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

            <div className="text-3xl">

              🔒

            </div>

            <h2 className="text-lg font-black mt-3">

              Secure Transactions

            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-2">

              BharatP2P uses secure escrow-style trading flow to protect buyers and sellers during every transaction.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

            <div className="text-3xl">

              ⚡

            </div>

            <h2 className="text-lg font-black mt-3">

              Fast Order Processing

            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-2">

              Deposits and P2P orders are reviewed quickly for smooth and efficient trading experience.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

            <div className="text-3xl">

              🇮🇳

            </div>

            <h2 className="text-lg font-black mt-3">

              Designed For Indian Users

            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-2">

              Support for UPI, Bank Transfer, IMPS and Indian payment systems with easy user-friendly interface.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

            <div className="text-3xl">

              🎧

            </div>

            <h2 className="text-lg font-black mt-3">

              24/7 Support

            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-2">

              Our support team is available anytime for deposits, orders and payment related assistance.

            </p>

          </div>

        </div>

        {/* EXTRA */}

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

          <h2 className="text-lg font-black">

            Why BharatP2P?

          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-300 leading-7">

            <p>

              • Premium dark UI with fast experience.

            </p>

            <p>

              • Trusted Indian payment support system.

            </p>

            <p>

              • Quick order verification and release.

            </p>

            <p>

              • Smooth mobile optimized interface.

            </p>

          </div>

        </div>

        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-6 pb-4 text-sm">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

    </main>

  );

}