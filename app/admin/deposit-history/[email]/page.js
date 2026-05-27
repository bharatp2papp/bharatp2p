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

export default function DepositHistoryPage() {

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

  useEffect(() => {

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

            Deposit History

          </h1>

        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-[30px] p-5">

          <p className="text-gray-400">

            User Email

          </p>

          <h2 className="font-bold break-all mt-2">

            {email}

          </h2>

          <div className="mt-5 bg-[#0d1324] p-4 rounded-2xl">

            <p className="text-gray-400 text-sm">

              Wallet Balance

            </p>

            <h2 className="font-bold mt-2 text-green-400">

              {user?.balance || 0} USDT

            </h2>

          </div>

        </div>

        <div className="mt-8 space-y-5">

          {deposits.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[30px] p-5"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-black text-yellow-400">

                  {item.amount} USDT

                </h2>

                <p className="font-bold text-green-400">

                  {item.status}

                </p>

              </div>

              <div className="mt-5 space-y-3">

                <p>

                  <span className="text-gray-400">

                    Network:

                  </span>

                  {" "}
                  {item.network}

                </p>

                <p className="break-all">

                  <span className="text-gray-400">

                    TRX ID:

                  </span>

                  {" "}
                  {item.trxid}

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

          ))}

        </div>

      </div>

    </main>

  );

}