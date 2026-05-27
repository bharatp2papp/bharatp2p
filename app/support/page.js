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

export default function SupportPage() {

  const [telegram, setTelegram] =
    useState("");

  const [whatsapp, setWhatsapp] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadSupport();

  }, []);

  const loadSupport =
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

          setTelegram(
            data.telegram || ""
          );

          setWhatsapp(
            data.whatsapp || ""
          );

          setEmail(
            data.email || ""
          );

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

    <main className="min-h-screen bg-[#050816] text-white p-4 overflow-hidden relative">

      {/* GLOW */}

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-sm mx-auto">

        {/* TOP */}

        <div className="flex items-center gap-3">

          <Link href="/dashboard">

            <button className="text-2xl text-green-400">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Support

          </h1>

        </div>

        {/* HERO */}

        <div className="mt-6 bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <div className="flex flex-col items-center text-center">

            <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_35px_rgba(34,197,94,0.20)]">

              <div className="w-14 h-14 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center">

                <span className="text-green-400 text-2xl font-black tracking-[-2px]">

                  BP

                </span>

                <span className="text-yellow-300 text-2xl font-black -ml-1">

                  ⚡

                </span>

              </div>

            </div>

            <h2 className="text-2xl font-black mt-4">

              24/7 Support

            </h2>

            <p className="text-gray-400 mt-3 leading-6 text-sm">

              Contact support for deposits, orders and payment issues anytime.

            </p>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-6 space-y-4">

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            className="block bg-gradient-to-r from-green-400 to-green-600 text-black rounded-[28px] p-5 shadow-xl shadow-green-500/20"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black">

                  WhatsApp

                </h2>

                <p className="text-black/70 mt-1 text-sm font-semibold">

                  Instant Live Chat

                </p>

              </div>

              <div className="text-3xl">

                💬

              </div>

            </div>

          </a>

          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            className="block bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-[28px] p-5 shadow-xl shadow-blue-500/20"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black">

                  Telegram

                </h2>

                <p className="text-white/80 mt-1 text-sm font-semibold">

                  Fast Community Support

                </p>

              </div>

              <div className="text-3xl">

                ✈️

              </div>

            </div>

          </a>

          <a
            href={`mailto:${email}`}
            className="block bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl"
          >

            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">

                <h2 className="text-xl font-black">

                  Email

                </h2>

                <p className="text-gray-400 mt-1 text-sm break-all">

                  {email || "support@bharatp2p.com"}

                </p>

              </div>

              <div className="text-3xl shrink-0">

                📩

              </div>

            </div>

          </a>

        </div>

        {/* FEATURES */}

        <div className="grid grid-cols-3 gap-2 mt-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl py-3 text-center">

            <div className="text-xl">

              ⚡

            </div>

            <p className="text-[11px] text-gray-300 mt-1">

              Fast

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl py-3 text-center">

            <div className="text-xl">

              🔒

            </div>

            <p className="text-[11px] text-gray-300 mt-1">

              Secure

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl py-3 text-center">

            <div className="text-xl">

              🟢

            </div>

            <p className="text-[11px] text-gray-300 mt-1">

              Online

            </p>

          </div>

        </div>

        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-8 pb-4 text-xs">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

    </main>

  );

}