"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function WalletHistoryPage() {

  const [logs, setLogs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    onValue(
      ref(db, "orders"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const arr =
            Object.keys(data).map((key) => ({
              id: key,
              ...data[key]
            }));

          setLogs(arr.reverse());

        } else {

          setLogs([]);

        }

      }
    );

  }, []);

  const filteredLogs =
    logs.filter((item) =>
      item.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Wallet Logs

          </h1>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search User Email..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        {/* LOGS */}

        <div className="mt-8 space-y-5">

          {filteredLogs.length > 0 ? (

            filteredLogs.map((item) => (

              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-[35px] p-5"
              >

                <div className="space-y-4">

                  <div>

                    <p className="text-gray-400">

                      User Email

                    </p>

                    <h2 className="font-bold break-all mt-1">

                      {item.email}

                    </h2>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Type

                      </p>

                      <h2 className="font-bold mt-2 text-yellow-400">

                        {item.type}

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Amount

                      </p>

                      <h2 className="font-bold mt-2 text-green-400">

                        {item.amount}

                      </h2>

                    </div>

                  </div>

                  {item.network && (

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Network

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.network}

                      </h2>

                    </div>

                  )}

                  {item.trxid && (

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Transaction ID

                      </p>

                      <h2 className="font-bold mt-2 break-all">

                        {item.trxid}

                      </h2>

                    </div>

                  )}

                  <div className="bg-[#0d1324] p-4 rounded-2xl">

                    <p className="text-gray-400 text-sm">

                      Status

                    </p>

                    <h2 className={`font-bold mt-2 ${
                      item.status === "Approved"
                      ? "text-green-400"
                      : item.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                    }`}>

                      {item.status}

                    </h2>

                  </div>

                  <div className="bg-[#0d1324] p-4 rounded-2xl">

                    <p className="text-gray-400 text-sm">

                      Time

                    </p>

                    <h2 className="font-bold mt-2">

                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleString()
                        : "N/A"}

                    </h2>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

              No Wallet Logs Found

            </div>

          )}

        </div>

      </div>

    </main>

  );

}