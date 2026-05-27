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

export default function SecurityPage() {

  const [users, setUsers] =
    useState([]);

  const [deposits, setDeposits] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    /* USERS */

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const arr =
            Object.keys(data).map((key) => ({
              id: key,
              ...data[key]
            }));

          setUsers(arr.reverse());

        }

      }
    );

    /* DEPOSITS */

    onValue(
      ref(db, "deposits"),
      (snapshot) => {

        if (snapshot.exists()) {

          setDeposits(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

  }, []);

  const blockedUsers =
    users.filter(
      (item) => item.blocked
    );

  const filteredBlocked =
    blockedUsers.filter((item) =>
      item.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const trxMap = {};

  deposits.forEach((item) => {

    if (!trxMap[item.trxid]) {

      trxMap[item.trxid] = 1;

    } else {

      trxMap[item.trxid] += 1;

    }

  });

  const duplicateTrx =
    Object.keys(trxMap).filter(
      (trx) =>
        trxMap[trx] > 1
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

            Security Center

          </h1>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Blocked User..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        {/* SECURITY STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-5">

            <div className="text-4xl">

              🚫

            </div>

            <h2 className="mt-4 text-3xl font-black text-red-400">

              {blockedUsers.length}

            </h2>

            <p className="text-gray-400 mt-2 text-sm">

              Blocked Users

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-5">

            <div className="text-4xl">

              ⚠️

            </div>

            <h2 className="mt-4 text-3xl font-black text-yellow-400">

              {duplicateTrx.length}

            </h2>

            <p className="text-gray-400 mt-2 text-sm">

              Duplicate TRX IDs

            </p>

          </div>

        </div>

        {/* BLOCKED USERS */}

        <div className="mt-10">

          <h2 className="text-2xl font-black">

            Blocked Users

          </h2>

          <div className="mt-5 space-y-5">

            {filteredBlocked.length > 0 ? (

              filteredBlocked.map((item) => (

                <div
                  key={item.id}
                  className="bg-white/5 border border-red-500/20 rounded-[35px] p-5"
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

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Block Reason

                      </p>

                      <h2 className="font-bold mt-2 text-red-400">

                        {item.blockedReason || "N/A"}

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Blocked Time

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.blockedAt
                          ? new Date(
                              item.blockedAt
                            ).toLocaleString()
                          : "N/A"}

                      </h2>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

                No Blocked Users

              </div>

            )}

          </div>

        </div>

        {/* DUPLICATE TRX */}

        <div className="mt-10">

          <h2 className="text-2xl font-black">

            Duplicate Transaction IDs

          </h2>

          <div className="mt-5 space-y-5">

            {duplicateTrx.length > 0 ? (

              duplicateTrx.map((trx, index) => (

                <div
                  key={index}
                  className="bg-white/5 border border-yellow-500/20 rounded-[35px] p-5"
                >

                  <p className="text-gray-400">

                    Duplicate TRX ID

                  </p>

                  <h2 className="font-bold mt-3 break-all text-yellow-400">

                    {trx}

                  </h2>

                </div>

              ))

            ) : (

              <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

                No Duplicate TRX Found

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );

}