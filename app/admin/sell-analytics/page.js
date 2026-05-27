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
  ref,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function SellAnalyticsPage() {

  const router =
    useRouter();

  const [users, setUsers] =
    useState([]);

  const [sellOrders, setSellOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          setUsers(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

    onValue(
      ref(db, "sellOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          setSellOrders(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

  }, []);

  const getUserOrders =
    (email) => {

      return sellOrders.filter(
        (item) =>
          item.seller ===
          email
      );

    };

  const getTotalSell =
    (email) => {

      return getUserOrders(
        email
      ).reduce(
        (sum, item) =>
          sum +
          Number(
            item.usdt || 0
          ),
        0
      );

    };

  const filtered =
    users.filter((item) =>
      item.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              router.back()
            }
            className="text-3xl"
          >

            ←

          </button>

          <h1 className="text-3xl font-black">

            Sell Analytics

          </h1>

        </div>

        <input
          type="text"
          placeholder="Search Seller..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        <div className="mt-8 space-y-5">

          {filtered.map((item, index) => {

            const orders =
              getUserOrders(
                item.email
              );

            return (

              <Link
                key={index}
                href={`/admin/sell-history/${encodeURIComponent(item.email)}`}
              >

                <div className="bg-white/5 border border-white/10 rounded-[30px] p-5">

                  <p className="text-gray-400">

                    Seller Email

                  </p>

                  <h2 className="font-bold break-all mt-2">

                    {item.email}

                  </h2>

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Total Sell

                      </p>

                      <h2 className="font-bold mt-2 text-red-400">

                        {getTotalSell(item.email)} USDT

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Trades

                      </p>

                      <h2 className="font-bold mt-2">

                        {orders.length} Orders

                      </h2>

                    </div>

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </main>

  );

}