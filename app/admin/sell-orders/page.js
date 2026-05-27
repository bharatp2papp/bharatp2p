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
  push
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function SellOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loadingId, setLoadingId] =
    useState("");

  const [selectedReason, setSelectedReason] =
    useState({});

  useEffect(() => {

    onValue(
      ref(db, "sellOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const arr =
            Object.keys(data).map((key) => ({
              id: key,
              ...data[key]
            }));

          setOrders(arr.reverse());

        } else {

          setOrders([]);

        }

      }
    );

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
          ? "Sell Payment Verified"
          : "USDT Not Received");

      await update(

        ref(
          db,
          `sellOrders/${item.id}`
        ),

        {
          status,
          adminReason:
            reason
        }

      );

      /* SAVE TO USER MY ORDERS */

      await push(
        ref(db, "orders"),
        {
          email:
            item.seller,

          type:
            "Sell",

          amount:
            item.inr,

          usdt:
            item.usdt,

          status,

          adminReason:
            reason,

          createdAt:
            Date.now()
        }
      );

      alert(
        `Order ${status}`
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

  const filteredOrders =
    orders.filter((item) =>
      item.seller
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

            Sell Orders

          </h1>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Seller Email..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        {/* ORDERS */}

        <div className="mt-8 space-y-5">

          {filteredOrders.length > 0 ? (

            filteredOrders.map((item) => (

              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-[35px] p-5"
              >

                <div className="space-y-4">

                  {/* SELLER */}

                  <div>

                    <p className="text-gray-400">

                      Seller Email

                    </p>

                    <h2 className="font-bold break-all mt-1">

                      {item.seller}

                    </h2>

                  </div>

                  {/* AMOUNT */}

                  <div className="grid grid-cols-2 gap-3">

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        INR Amount

                      </p>

                      <h2 className="font-bold mt-2">

                        ₹{item.inr}

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        USDT

                      </p>

                      <h2 className="font-bold mt-2">

                        {item.usdt}

                      </h2>

                    </div>

                  </div>

                  {/* STATUS */}

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

                  {/* ADMIN NOTE */}

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

                  {/* TIME */}

                  <div className="bg-[#0d1324] p-4 rounded-2xl">

                    <p className="text-gray-400 text-sm">

                      Order Time

                    </p>

                    <h2 className="font-bold mt-2">

                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleString()
                        : "N/A"}

                    </h2>

                  </div>

                  {/* ACTIONS */}

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

                        <option value="Sell Payment Verified">

                          Sell Payment Verified

                        </option>

                        <option value="INR Sent Successfully">

                          INR Sent Successfully

                        </option>

                        <option value="Seller Transfer Confirmed">

                          Seller Transfer Confirmed

                        </option>

                        <option value="Fake Sell Request">

                          Fake Sell Request

                        </option>

                        <option value="USDT Not Received">

                          USDT Not Received

                        </option>

                        <option value="Invalid Sell Details">

                          Invalid Sell Details

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

              No Sell Orders Found

            </div>

          )}

        </div>

      </div>

    </main>

  );

}