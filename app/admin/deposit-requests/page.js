"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  onValue,
  update,
  get,
  push
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function DepositRequestsPage() {

  const [requests, setRequests] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loadingId, setLoadingId] =
    useState("");

  const [selectedReason, setSelectedReason] =
    useState({});

  useEffect(() => {

    const depositRef =
      ref(db, "deposits");

    onValue(depositRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        const arr =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setRequests(arr.reverse());

      } else {

        setRequests([]);

      }

    });

  }, []);

  const updateStatus =
    async (
      item,
      status
    ) => {

    try {

      setLoadingId(item.id);

      const reason =
        selectedReason[item.id] ||
        (status === "Approved"
          ? "Transaction Verified Successfully"
          : "Invalid Deposit Details");

      await update(

        ref(
          db,
          `deposits/${item.id}`
        ),

        {
          status,
          adminReason:
            reason
        }

      );

      if (status === "Approved") {

        const usersSnapshot =
          await get(
            ref(
              db,
              "users"
            )
          );

        if (
          usersSnapshot.exists()
        ) {

          const users =
            usersSnapshot.val();

          for (const key in users) {

            if (
              users[key].email ===
              item.email
            ) {

              const oldBalance =
                Number(
                  users[key]
                    .balance || 0
                );

              const newBalance =
                oldBalance +
                Number(
                  item.amount
                );

              await update(

                ref(
                  db,
                  `users/${key}`
                ),

                {
                  balance:
                    newBalance
                }

              );

            }

          }

        }

      }

      /* SAVE TO ORDERS */

      await push(

        ref(
          db,
          "orders"
        ),

        {
          email:
            item.email,

          type:
            "Deposit",

          amount:
            item.amount,

          network:
            item.network,

          trxid:
            item.trxid,

          status,

          adminReason:
            reason,

          createdAt:
            Date.now()
        }

      );

      alert(
        `Deposit ${status}`
      );

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoadingId("");

    }

  };

  const filteredRequests =
    requests.filter((item) =>
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

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Deposit Requests

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

        <div className="mt-8 space-y-5">

          {filteredRequests.length > 0 ? (

            filteredRequests.map((item) => (

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

                        Amount

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.amount} USDT

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Network

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.network}

                      </h2>

                    </div>

                  </div>

                  <div className="bg-[#0d1324] p-4 rounded-2xl">

                    <p className="text-gray-400 text-sm">

                      Transaction ID

                    </p>

                    <h2 className="font-bold mt-2 break-all">

                      {item.trxid}

                    </h2>

                  </div>

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

                  {item.adminReason && (

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Admin Note

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.adminReason}

                      </h2>

                    </div>

                  )}

                  {item.status === "Pending" && (

                    <>

                      <select
                        value={
                          selectedReason[
                            item.id
                          ] || ""
                        }
                        onChange={(e)=>
                          setSelectedReason({
                            ...selectedReason,
                            [item.id]:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
                      >

                        <option value="">

                          Select Admin Reason

                        </option>

                        <option value="Transaction Verified Successfully">

                          Transaction Verified Successfully

                        </option>

                        <option value="Payment Received Successfully">

                          Payment Received Successfully

                        </option>

                        <option value="USDT Deposit Approved">

                          USDT Deposit Approved

                        </option>

                        <option value="Fake Transaction ID">

                          Fake Transaction ID

                        </option>

                        <option value="Payment Not Received">

                          Payment Not Received

                        </option>

                        <option value="Invalid Deposit Details">

                          Invalid Deposit Details

                        </option>

                        <option value="Duplicate Transaction ID">

                          Duplicate Transaction ID

                        </option>

                      </select>

                      <div className="grid grid-cols-2 gap-3">

                        <button
                          onClick={() =>
                            updateStatus(
                              item,
                              "Approved"
                            )
                          }
                          disabled={
                            loadingId ===
                            item.id
                          }
                          className="bg-green-500 text-black py-4 rounded-2xl font-bold"
                        >

                          Approve

                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              item,
                              "Rejected"
                            )
                          }
                          disabled={
                            loadingId ===
                            item.id
                          }
                          className="bg-red-500 text-white py-4 rounded-2xl font-bold"
                        >

                          Reject

                        </button>

                      </div>

                    </>

                  )}

                </div>

              </div>

            ))

          ) : (

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

              No Deposit Requests Found

            </div>

          )}

        </div>

      </div>

    </main>

  );

}