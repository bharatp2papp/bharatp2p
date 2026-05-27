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

export default function AnalyticsPage() {

  const router =
    useRouter();

  const [users, setUsers] =
    useState([]);

  const [totalBalance, setTotalBalance] =
    useState(0);

  const [totalDeposits, setTotalDeposits] =
    useState(0);

  const [buyOrders, setBuyOrders] =
    useState(0);

  const [sellOrders, setSellOrders] =
    useState(0);

  useEffect(() => {

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          const arr =
            Object.values(
              snapshot.val()
            );

          setUsers(arr);

          let balance = 0;

          arr.forEach((item) => {

            balance += Number(
              item.balance || 0
            );

          });

          setTotalBalance(
            balance
          );

        }

      }
    );

    onValue(
      ref(db, "deposits"),
      (snapshot) => {

        if (snapshot.exists()) {

          setTotalDeposits(
            Object.keys(
              snapshot.val()
            ).length
          );

        }

      }
    );

    onValue(
      ref(db, "buyOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          setBuyOrders(
            Object.keys(
              snapshot.val()
            ).length
          );

        }

      }
    );

    onValue(
      ref(db, "sellOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          setSellOrders(
            Object.keys(
              snapshot.val()
            ).length
          );

        }

      }
    );

  }, []);

  const now =
    new Date();

  const todayUsers =
    users.filter((item) => {

      if (!item.createdAt)
        return false;

      const d =
        new Date(
          item.createdAt
        );

      return (
        d.toDateString() ===
        now.toDateString()
      );

    });

  const weekUsers =
    users.filter((item) => {

      if (!item.createdAt)
        return false;

      const d =
        new Date(
          item.createdAt
        );

      const diff =
        now - d;

      return (
        diff <
        7 * 24 * 60 * 60 * 1000
      );

    });

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              router.push("/admin")
            }
            className="text-3xl"
          >

            ←

          </button>

          <h1 className="text-3xl font-black">

            Analytics

          </h1>

        </div>

        {/* USER STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <Link href="/admin/all-users">

            <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                👥

              </div>

              <h2 className="mt-4 text-3xl font-black">

                {users.length}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                Total Users

              </p>

            </div>

          </Link>

          <Link href="/admin/today-users">

            <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                📅

              </div>

              <h2 className="mt-4 text-3xl font-black text-yellow-400">

                {todayUsers.length}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                Today Users

              </p>

            </div>

          </Link>

          <Link href="/admin/week-users">

            <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                ⚡

              </div>

              <h2 className="mt-4 text-3xl font-black text-blue-400">

                {weekUsers.length}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                This Week

              </p>

            </div>

          </Link>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-5">

            <div className="text-4xl">

              🪙

            </div>

            <h2 className="mt-4 text-3xl font-black text-green-400">

              {totalBalance}

            </h2>

            <p className="text-gray-400 mt-2 text-sm">

              Wallet Balance

            </p>

          </div>

        </div>

        {/* HISTORY */}

        <div className="grid grid-cols-2 gap-4 mt-4">

          <Link href="/admin/deposit-analytics">

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                💰

              </div>

              <h2 className="mt-4 text-2xl font-black">

                {totalDeposits}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                Deposit History

              </p>

            </div>

          </Link>

          <Link href="/admin/buy-analytics">

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                🟢

              </div>

              <h2 className="mt-4 text-2xl font-black">

                {buyOrders}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                Buy History

              </p>

            </div>

          </Link>

          <Link href="/admin/sell-analytics">

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 active:scale-95 transition-all">

              <div className="text-4xl">

                🔴

              </div>

              <h2 className="mt-4 text-2xl font-black">

                {sellOrders}

              </h2>

              <p className="text-gray-400 mt-2 text-sm">

                Sell History

              </p>

            </div>

          </Link>

        </div>

      </div>

    </main>

  );

}