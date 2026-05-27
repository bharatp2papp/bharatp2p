"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  set,
  get
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function DepositControlPage() {

  const [trc20, setTrc20] =
    useState("");

  const [bep20, setBep20] =
    useState("");

  const [trcQr, setTrcQr] =
    useState("");

  const [bepQr, setBepQr] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
            "paymentSettings"
          )
        );

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        setTrc20(
          data.trc20Address || ""
        );

        setBep20(
          data.bep20Address || ""
        );

        setTrcQr(
          data.trc20Qr || ""
        );

        setBepQr(
          data.bep20Qr || ""
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const saveSettings =
    async () => {

    try {

      setLoading(true);

      await set(

        ref(
          db,
          "paymentSettings"
        ),

        {
          trc20Address:
            trc20,

          bep20Address:
            bep20,

          trc20Qr:
            trcQr,

          bep20Qr:
            bepQr,

          updatedAt:
            Date.now()
        }

      );

      alert(
        "Deposit Control Updated"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between">

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Deposit Control

          </h1>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-black text-green-400">

            TRC20

          </h2>

          <div className="mt-4 space-y-4">

            <input
              type="text"
              placeholder="TRC20 Address"
              value={trc20}
              onChange={(e)=>
                setTrc20(
                  e.target.value
                )
              }
              className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
            />

            <input
              type="text"
              placeholder="TRC20 QR Image Link"
              value={trcQr}
              onChange={(e)=>
                setTrcQr(
                  e.target.value
                )
              }
              className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
            />

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-black text-green-400">

            BEP20

          </h2>

          <div className="mt-4 space-y-4">

            <input
              type="text"
              placeholder="BEP20 Address"
              value={bep20}
              onChange={(e)=>
                setBep20(
                  e.target.value
                )
              }
              className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
            />

            <input
              type="text"
              placeholder="BEP20 QR Image Link"
              value={bepQr}
              onChange={(e)=>
                setBepQr(
                  e.target.value
                )
              }
              className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
            />

          </div>

        </div>

        <button
          onClick={saveSettings}
          disabled={loading}
          className="w-full mt-8 bg-green-500 text-black py-5 rounded-3xl font-bold text-lg"
        >

          {loading
            ? "Saving..."
            : "Save Deposit Control"}

        </button>

      </div>

    </main>

  );

}