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

export default function BuyPage() {

  const [sellers, setSellers] =
    useState([]);

  useEffect(() => {

    const buyRef =
      ref(
        db,
        "buyListings"
      );

    onValue(buyRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        const arr =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setSellers(arr.reverse());

      } else {

        setSellers([]);

      }

    });

  }, []);

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="flex items-center gap-4">

        <Link href="/dashboard">

          <button className="text-3xl text-green-400">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          Buy USDT

        </h1>

      </div>

      <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-3xl p-5">

        <h2 className="text-xl font-bold text-green-400">

          Trusted P2P Sellers

        </h2>

        <p className="text-gray-400 mt-2 leading-7">

          Select the best seller based on price and payment methods.

        </p>

      </div>

      <div className="mt-8 space-y-5">

        {sellers.length > 0 ? (

          sellers.map((seller) => (

            <div
              key={seller.id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-6"
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold">

                    {seller.sellerName}

                  </h2>

                  <p className="text-green-400 mt-2">

                    Success Rate:
                    {" "}
                    {seller.success || "99%"}

                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-black text-green-400">

                    ₹{seller.price}

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

                    ₹{seller.min} - ₹{seller.max}

                  </h2>

                </div>

                <div className="bg-[#0d1324] rounded-2xl p-4">

                  <p className="text-gray-400">

                    Payment

                  </p>

                  <h2 className="font-bold mt-2">

                    {seller.upiEnabled &&
                    seller.bankEnabled
                      ? "UPI + Bank"
                      : seller.upiEnabled
                      ? "UPI"
                      : seller.bankEnabled
                      ? "Bank / IMPS"
                      : "N/A"}

                  </h2>

                </div>

              </div>

              <Link
                href={`/buy/${seller.id}`}
              >

                <button className="w-full mt-6 bg-green-500 text-black py-4 rounded-2xl font-bold text-lg">

                  Buy USDT

                </button>

              </Link>

            </div>

          ))

        ) : (

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

            No Buy Listings Available

          </div>

        )}

      </div>

      <p className="text-center text-gray-500 mt-10 pb-5">

        © 2026 BharatP2P. All Rights Reserved.

      </p>

    </main>

  );

}