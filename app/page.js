"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  get
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function HomePage() {

  const [showSupport, setShowSupport] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      totalUsers: "0",
      volume: "0",
      trades: "0",
      whatsapp: "",
      telegram: "",
      email: ""
    });

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings =
    async () => {

      try {

        const snapshot =
          await get(
            ref(
              db,
              "supportSettings"
            )
          );

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          setStats({

            totalUsers:
              data.totalUsers || "0",

            volume:
              data.volume || "0",

            trades:
              data.trades || "0",

            whatsapp:
              data.whatsapp || "",

            telegram:
              data.telegram || "",

            email:
              data.email || ""

          });

        }

      } catch (err) {

        console.log(err);

      } finally {

        setTimeout(() => {

          setLoading(false);

        }, 900);

      }

    };

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

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative flex items-center justify-center p-4">

      {showSupport && (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">

          <div className="w-full max-w-sm bg-[#0d1324] border border-white/10 rounded-[28px] p-5">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-black">

                Support

              </h2>

              <button
                onClick={() =>
                  setShowSupport(false)
                }
                className="text-xl text-red-400"
              >

                ✕

              </button>

            </div>

            <div className="mt-5 space-y-3">

              <a
                href={`https://wa.me/${stats.whatsapp}`}
                target="_blank"
                className="block bg-green-500 text-black rounded-[20px] p-4 font-black text-center text-sm"
              >

                WhatsApp Support

              </a>

              <a
                href={`https://t.me/${stats.telegram}`}
                target="_blank"
                className="block bg-blue-500 text-white rounded-[20px] p-4 font-black text-center text-sm"
              >

                Telegram Support

              </a>

              <a
                href={`mailto:${stats.email}`}
                className="block bg-white/10 border border-white/10 rounded-[20px] p-4 font-black text-center text-sm"
              >

                Email Support

              </a>

            </div>

          </div>

        </div>

      )}

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <section className="relative z-10 w-full max-w-sm">

        <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

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

            <p className="text-gray-400 mt-2 text-sm">

              India Trusted Crypto Exchange

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

          <div className="mt-6 text-center">

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full text-[11px] text-gray-300">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              Fast • Secure • Trusted

            </div>

            <h2 className="text-2xl font-black leading-tight mt-4">

              Premium P2P

              <span className="text-green-400">

                {" "}Exchange{" "}

              </span>

              Platform

            </h2>

          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">

            <div className="bg-white/5 border border-white/10 rounded-[20px] p-3 text-center">

              <div className="text-xl">

                👥

              </div>

              <h3 className="text-lg font-black mt-1">

                {stats.totalUsers}

              </h3>

              <p className="text-gray-400 text-[11px] mt-1">

                Users

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[20px] p-3 text-center">

              <div className="text-xl">

                📈

              </div>

              <h3 className="text-lg font-black mt-1">

                ${stats.volume}

              </h3>

              <p className="text-gray-400 text-[11px] mt-1">

                Volume

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[20px] p-3 text-center">

              <div className="text-xl">

                ⚡

              </div>

              <h3 className="text-lg font-black mt-1">

                {stats.trades}

              </h3>

              <p className="text-gray-400 text-[11px] mt-1">

                Trades

              </p>

            </div>

          </div>

          <div className="mt-6 space-y-3">

            <Link href="/login">

              <button className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[20px] font-black text-sm shadow-xl shadow-green-500/20">

                Login

              </button>

            </Link>

            <Link href="/register">

              <button className="w-full bg-white/5 border border-white/10 py-4 rounded-[20px] font-black text-sm">

                Create Account

              </button>

            </Link>

          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">

            <div className="bg-white/5 border border-white/10 rounded-[18px] py-3 text-center">

              <div className="text-lg">

                🔒

              </div>

              <p className="text-[11px] text-gray-300 mt-1">

                Secure

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[18px] py-3 text-center">

              <div className="text-lg">

                ⚡

              </div>

              <p className="text-[11px] text-gray-300 mt-1">

                Fast

              </p>

            </div>

            <button
              onClick={() =>
                setShowSupport(true)
              }
              className="bg-white/5 border border-white/10 rounded-[18px] py-3 text-center"
            >

              <div className="text-lg">

                🎧

              </div>

              <p className="text-[11px] text-gray-300 mt-1">

                Support

              </p>

            </button>

          </div>

          <div className="mt-6 text-center text-gray-500 text-[11px]">

            © 2026 BharatP2P. All Rights Reserved.

          </div>

        </div>

      </section>

    </main>

  );

}