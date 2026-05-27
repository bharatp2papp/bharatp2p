"use client";

import {
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  push
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function BroadcastPage() {

  const [notification, setNotification] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendNotification =
    async () => {

    if (!notification) {

      alert(
        "Enter notification message"
      );

      return;

    }

    try {

      setLoading(true);

      await push(

        ref(
          db,
          "notifications"
        ),

        {
          message:
            notification,

          createdAt:
            Date.now()
        }

      );

      setNotification("");

      alert(
        "Notification Sent To All Users"
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

            Broadcast

          </h1>

        </div>

        <p className="text-gray-400 mt-6">

          Send offer & important messages to all users

        </p>

        <textarea
          placeholder="Write notification message..."
          value={notification}
          onChange={(e)=>
            setNotification(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none h-40 resize-none"
        />

        <button
          onClick={sendNotification}
          disabled={loading}
          className="w-full mt-6 bg-yellow-400 text-black py-5 rounded-3xl font-black text-lg"
        >

          {loading
            ? "Sending..."
            : "Send Notification"}

        </button>

      </div>

    </main>

  );

}