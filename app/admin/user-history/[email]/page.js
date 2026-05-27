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

export default function UserHistoryPage() {

  const router =
    useRouter();

  const params =
    useParams();

  const email =
    decodeURIComponent(
      params.email
    );

  const [user, setUser] =
    useState(null);

  const [deposits, setDeposits] =
    useState([]);

  const [buyOrders, setBuyOrders] =
    useState([]);

  const [sellOrders, setSellOrders] =
    useState([]);

  useEffect(() => {

    /* USERS */

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          const users =
            Object.values(
              snapshot.val()
            );

          const found =
            users.find(
              (item) =>
                item.email ===
                email
            );

          setUser(found);

        }

      }
    );

    /* DEPOSITS */

    onValue(
      ref(db, "deposits"),
      (snapshot) => {

        if (snapshot.exists()) {

          const arr =
            Object.values(
              snapshot.val()
            ).filter(
              (item) =>
                item.email ===
                email
            );

          setDeposits(
            arr.reverse()
          );

        }

      }
    );

    /* BUY ORDERS */

    onValue(
      ref(db, "buyOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          const arr =
            Object.values(
              snapshot.val()
            ).filter(
              (item) =>
                item.buyer ===
                email
            );

          setBuyOrders(
            arr.reverse()
          );

        }

      }
    );

    /* SELL ORDERS */

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

          setSellOrders(
            arr.reverse()
          );

        }

      }
    );

  }, []);

  const totalDeposit =
    deposits.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );

  const totalBuy =
    buyOrders.reduce(
      (sum, item) =>
        sum +
        Number(
          item.usdt || 0
        ),
      0
    );

  const totalSell =
    sellOrders.reduce(
      (sum, item) =>
        sum +
        Number(
          item.usdt || 0
        ),
      0
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              router.back()
            }
            className="text-3xl"
          >

            ←

          </button>

          <h1 className="text-2xl font-black">

            User History

          </h1>

        </div>

        {/* USER INFO */}

        <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-5">

          <div className="space-y-4">

            <div>

              <p className="text-gray-400">

                User Email

              </p>

              <h2 className="font-bold break-all mt-2">

                {email}

              </h2>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-[#0d1324] p-4 rounded-2xl">

                <p className="text-gray-400 text-sm">

                  Wallet

                </p>

                <h2 className="font-bold mt-2 text-green-400">

                  {user?.balance || 0} USDT

                </h2>

              </div>

              <div className="bg-[#0d1324] p-4 rounded-2xl">

                <p className="text-gray-400 text-sm">

                  Joined

                </p>

                <h2 className="font-bold mt-2 text-sm">

                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* TOTALS */}

        <div className="grid grid-cols-3 gap-3 mt-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

            <h2 className="text-xl font-black text-yellow-400">

              {totalDeposit}

            </h2>

            <p className="text-xs text-gray-400 mt-2">

              Deposit

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

            <h2 className="text-xl font-black text-green-400">

              {totalBuy}

            </h2>

            <p className="text-xs text-gray-400 mt-2">

              Buy

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

            <h2 className="text-xl font-black text-red-400">

              {totalSell}

            </h2>

            <p className="text-xs text-gray-400 mt-2">

              Sell

            </p>

          </div>

        </div>

        {/* DEPOSIT HISTORY */}

        <div className="mt-10">

          <h2 className="text-2xl font-black">

            Deposit History

          </h2>

          <div className="mt-5 space-y-4">

            {deposits.map((item, index) => (

              <div
                key={index}
                className="bg-[#0d1324] p-4 rounded-2xl"
              >

                <div className="flex items-center justify-between">

                  <h2 className="font-bold text-yellow-400">

                    {item.amount} USDT

                  </h2>

                  <p className="text-sm text-gray-400">

                    {item.status}

                  </p>

                </div>

                <p className="text-sm mt-3">

                  Network: {item.network}

                </p>

                <p className="text-sm text-gray-400 mt-2 break-all">

                  TRX ID: {item.trxid}

                </p>

                <p className="text-sm mt-3">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* BUY HISTORY */}

        <div className="mt-10">

          <h2 className="text-2xl font-black">

            Buy History

          </h2>

          <div className="mt-5 space-y-4">

            {buyOrders.map((item, index) => (

              <div
                key={index}
                className="bg-[#0d1324] p-4 rounded-2xl"
              >

                <div className="flex items-center justify-between">

                  <h2 className="font-bold text-green-400">

                    {item.usdt} USDT

                  </h2>

                  <p className="text-sm text-gray-400">

                    {item.status}

                  </p>

                </div>

                <p className="text-sm mt-3">

                  INR: ₹{item.amount}

                </p>

                <p className="text-sm mt-2">

                  Method: {item.method || "N/A"}

                </p>

                {item.adminReason && (

                  <p className="text-sm text-yellow-400 mt-2">

                    {item.adminReason}

                  </p>

                )}

                <p className="text-sm mt-3">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* SELL HISTORY */}

        <div className="mt-10">

          <h2 className="text-2xl font-black">

            Sell History

          </h2>

          <div className="mt-5 space-y-4">

            {sellOrders.map((item, index) => (

              <div
                key={index}
                className="bg-[#0d1324] p-4 rounded-2xl"
              >

                <div className="flex items-center justify-between">

                  <h2 className="font-bold text-red-400">

                    {item.usdt} USDT

                  </h2>

                  <p className="text-sm text-gray-400">

                    {item.status}

                  </p>

                </div>

                <p className="text-sm mt-3">

                  INR: ₹{item.inr}

                </p>

                <p className="text-sm mt-2">

                  Method: {item.method || "N/A"}

                </p>

                {item.adminReason && (

                  <p className="text-sm text-yellow-400 mt-2">

                    {item.adminReason}

                  </p>

                )}

                <p className="text-sm mt-3">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}
