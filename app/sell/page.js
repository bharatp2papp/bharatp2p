"use client";

import Link from "next/link";

import {
  useEffect,
  useState
} from "react";

import {
  ref,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function SellPage() {

  const [buyers, setBuyers] =
    useState([]);

  useEffect(() => {

    const sellRef =
      ref(
        db,
        "sellListings"
      );

    onValue(sellRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        const arr =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setBuyers(arr.reverse());

      } else {

        setBuyers([]);

      }

    });

  }, []);

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="flex items-center gap-4">

        <Link href="/dashboard">

          <button className="text-3xl text-red-400">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          Sell USDT

        </h1>

      </div>

      <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-3xl p-5">

        <h2 className="text-xl font-bold text-red-400">

          Trusted P2P Buyers

        </h2>

        <p className="text-gray-400 mt-2 leading-7">

          Sell your USDT securely to verified buyers.

        </p>

      </div>

      <div className="mt-8 space-y-5">

        {buyers.length > 0 ? (

          buyers.map((buyer) => (

            <div
              key={buyer.id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-6"
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold">

                    {buyer.buyerName}

                  </h2>

                  <p className="text-red-400 mt-2">

                    Success Rate:
                    {" "}
                    {buyer.success || "99%"}

                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-black text-red-400">

                    ₹{buyer.price}

                  </h2>

                  <p className="text-gray-400">

                    per USDT

                  </p>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="bg-[#0d1324] rounded-2xl p-4">

                  <p className="text-gray-400">

                    Limit

                  </p>

                  <h2 className="font-bold mt-2">

                    ₹{buyer.min} - ₹{buyer.max}

                  </h2>

                </div>

                <div className="bg-[#0d1324] rounded-2xl p-4">

                  <p className="text-gray-400">

                    Payment

                  </p>

                  <h2 className="font-bold mt-2">

                    {buyer.upiEnabled &&
                    buyer.bankEnabled
                      ? "UPI + Bank"
                      : buyer.upiEnabled
                      ? "UPI"
                      : buyer.bankEnabled
                      ? "Bank / IMPS"
                      : "N/A"}

                  </h2>

                </div>

              </div>

              <Link
                href={`/sell/${buyer.id}`}
              >

                <button className="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl font-bold text-lg">

                  Sell USDT

                </button>

              </Link>

            </div>

          ))

        ) : (

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

            No Sell Listings Available

          </div>

        )}

      </div>

      <p className="text-center text-gray-500 mt-10 pb-5">

        © 2026 BharatP2P. All Rights Reserved.

      </p>

    </main>

  );

}