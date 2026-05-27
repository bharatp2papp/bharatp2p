"use client";

import {
  useEffect,
  useState
} from "react";

import {
  ref,
  set,
  get
} from "firebase/database";

import Link from "next/link";

import { db } from "@/lib/firebase";

export default function SupportControlPage() {

  const [telegram, setTelegram] =
    useState("");

  const [whatsapp, setWhatsapp] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [totalUsers, setTotalUsers] =
    useState("");

  const [volume, setVolume] =
    useState("");

  const [trades, setTrades] =
    useState("");

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

        setTelegram(
          data.telegram || ""
        );

        setWhatsapp(
          data.whatsapp || ""
        );

        setEmail(
          data.email || ""
        );

        setTotalUsers(
          data.totalUsers || ""
        );

        setVolume(
          data.volume || ""
        );

        setTrades(
          data.trades || ""
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const saveSettings =
    async () => {

    try {

      await set(

        ref(
          db,
          "supportSettings"
        ),

        {
          telegram,
          whatsapp,
          email,
          totalUsers,
          volume,
          trades
        }

      );

      alert(
        "Settings Saved"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Error Saving"
      );

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Support & Stats

          </h1>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Telegram Username"
            value={telegram}
            onChange={(e)=>
              setTelegram(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e)=>
              setWhatsapp(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="email"
            placeholder="Support Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="Fake Total Users"
            value={totalUsers}
            onChange={(e)=>
              setTotalUsers(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="Fake Trading Volume"
            value={volume}
            onChange={(e)=>
              setVolume(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="Fake Completed Trades"
            value={trades}
            onChange={(e)=>
              setTrades(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

        </div>

        <button
          onClick={saveSettings}
          className="w-full mt-8 bg-green-500 text-black py-5 rounded-3xl font-bold"
        >

          Save Settings

        </button>

      </div>

    </main>

  );

}