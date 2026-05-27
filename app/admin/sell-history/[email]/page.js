"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter,
  useParams
} from "next/navigation";

import {
  ref,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function SellHistoryPage() {

  const router =
    useRouter();

  const params =
    useParams();

  const email =
    decodeURIComponent(
      params.email
    );

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    onValue(
      ref(db, "sellOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          const arr =
            Object.values(
              snapshot.val()
            ).filter(
              (item) =>
                item.seller ===
                email
            );

          setOrders(
            arr.reverse()
          );

        }

      }
    );

  }, []);

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

            Sell History

          </h1>

        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-[30px] p-5">

          <p className="text-gray-400">

            Seller Email

          </p>

          <h2 className="font-bold break-all mt-2">

            {email}

          </h2>

        </div>

        <div className="mt-8 space-y-5">

          {orders.length > 0 ? (

            orders.map((item, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[30px] p-5"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-black text-red-400">

                    {item.usdt} USDT

                  </h2>

                  <p className={`font-bold ${
                    item.status === "Approved"
                    ? "text-green-400"
                    : item.status === "Rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                  }`}>

                    {item.status}

                  </p>

                </div>

                <div className="mt-5 space-y-3">

                  <p>

                    <span className="text-gray-400">

                      INR Amount:

                    </span>

                    {" "}
                    ₹{item.inr || item.amount}

                  </p>

                  <p>

                    <span className="text-gray-400">

                      Buyer:

                    </span>

                    {" "}
                    {item.buyer || "N/A"}

                  </p>

                  <p>

                    <span className="text-gray-400">

                      Payment Method:

                    </span>

                    {" "}
                    {item.method || "N/A"}

                  </p>

                  <p>

                    <span className="text-gray-400">

                      Admin Note:

                    </span>

                    {" "}
                    {item.adminReason || "N/A"}

                  </p>

                  <p>

                    <span className="text-gray-400">

                      Date & Time:

                    </span>

                    {" "}
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "N/A"}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 text-center text-gray-400">

              No Sell Orders

            </div>

          )}

        </div>

      </div>

    </main>

  );

}