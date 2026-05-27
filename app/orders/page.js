"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  onValue,
  update
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  useEffect(() => {

    const userEmail =
      localStorage.getItem(
        "bharatp2pUser"
      );

    if (!userEmail)
      return;

    onValue(
      ref(db, "orders"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const filteredOrders =
            Object.keys(data)
              .map((key) => ({
                id: key,
                ...data[key]
              }))
              .filter(
                (item) =>
                  item.email ===
                  userEmail
              )
              .reverse();

          setOrders(
            filteredOrders
          );

        } else {

          setOrders([]);

        }

      }
    );

  }, []);

  useEffect(() => {

    if (!selectedOrder)
      return;

    const timer =
      setInterval(() => {

        const total =
          15 * 60 * 1000;

        const distance =
          total -
          (
            Date.now() -
            selectedOrder.paymentTime
          );

        if (distance <= 0) {

          setTimeLeft(
            "Expired"
          );

          clearInterval(timer);

          return;

        }

        const minutes =
          Math.floor(
            (
              distance %
              (
                1000 * 60 * 60
              )
            ) /
            (
              1000 * 60
            )
          );

        const seconds =
          Math.floor(
            (
              distance %
              (
                1000 * 60
              )
            ) / 1000
          );

        setTimeLeft(
          `${minutes}m ${seconds}s`
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [selectedOrder]);

  const markPaid =
    async (id) => {

      await update(
        ref(
          db,
          `orders/${id}`
        ),
        {
          status: "Paid"
        }
      );

    };

  const cancelOrder =
    async (id) => {

      await update(
        ref(
          db,
          `orders/${id}`
        ),
        {
          status:
            "Cancelled"
        }
      );

    };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="flex items-center justify-between">

        <Link href="/dashboard">

          <button className="text-4xl">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          My Orders

        </h1>

      </div>

      <div className="mt-8 space-y-5">

        {orders.length > 0 ? (

          orders.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-[#131c31] border border-white/10 rounded-[35px] p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-black">

                      {item.type}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className={`text-lg font-bold ${
                    item.status ===
                    "Completed"
                    ? "text-green-400"
                    : item.status ===
                    "Cancelled"
                    ? "text-red-400"
                    : item.status ===
                    "Paid"
                    ? "text-blue-400"
                    : "text-yellow-400"
                  }`}>

                    {item.status}

                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="bg-[#0d1324] rounded-2xl p-4">

                    <p className="text-gray-400 text-sm">

                      Amount

                    </p>

                    <h2 className="font-bold mt-2">

                      ₹{item.amount}

                    </h2>

                  </div>

                  <div className="bg-[#0d1324] rounded-2xl p-4">

                    <p className="text-gray-400 text-sm">

                      USDT

                    </p>

                    <h2 className="font-bold mt-2">

                      {item.usdt}

                    </h2>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedOrder(
                      item
                    )
                  }
                  className="w-full mt-5 bg-green-500 text-black py-4 rounded-2xl font-bold"
                >

                  Open Order

                </button>

              </div>

            )
          )

        ) : (

          <div className="mt-16 bg-[#131c31] border border-white/10 rounded-[35px] p-8 text-center">

            <div className="text-6xl">

              📦

            </div>

            <h2 className="mt-6 text-3xl font-black">

              No Orders Yet

            </h2>

            <p className="mt-3 text-gray-400">

              Your buy & sell orders will appear here.

            </p>

          </div>

        )}

      </div>

      {selectedOrder && (

        <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto p-5">

          <div className="max-w-md mx-auto bg-[#0b1020] border border-white/10 rounded-[35px] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-black">

                Order Details

              </h2>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="text-3xl"
              >

                ×

              </button>

            </div>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-5 text-center">

              <p className="text-gray-400">

                Payment Time Left

              </p>

              <h2 className="text-4xl font-black text-yellow-400 mt-2">

                {timeLeft}

              </h2>

            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-5">

              <p className="text-gray-400">

                Order ID

              </p>

              <h2 className="font-bold mt-2 break-all">

                {selectedOrder.orderId}

              </h2>

            </div>

            <div className="mt-6 space-y-4">

              {selectedOrder.upiEnabled && (

                <div className="bg-[#131c31] rounded-2xl p-4">

                  <p className="text-gray-400">

                    UPI ID

                  </p>

                  <h2 className="font-bold mt-2 break-all">

                    {selectedOrder.upi}

                  </h2>

                </div>

              )}

              {selectedOrder.bankEnabled && (

                <div className="bg-[#131c31] rounded-2xl p-4 space-y-4">

                  <div>

                    <p className="text-gray-400">

                      Bank Name

                    </p>

                    <h2 className="font-bold mt-2">

                      {selectedOrder.bankName}

                    </h2>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Account Holder

                    </p>

                    <h2 className="font-bold mt-2">

                      {selectedOrder.accountName}

                    </h2>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Account Number

                    </p>

                    <h2 className="font-bold mt-2 break-all">

                      {selectedOrder.accountNumber}

                    </h2>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      IFSC

                    </p>

                    <h2 className="font-bold mt-2">

                      {selectedOrder.ifsc}

                    </h2>

                  </div>

                </div>

              )}

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <button
                onClick={() =>
                  cancelOrder(
                    selectedOrder.id
                  )
                }
                className="bg-red-500 text-white py-4 rounded-2xl font-bold"
              >

                Cancel

              </button>

              <button
                onClick={() =>
                  markPaid(
                    selectedOrder.id
                  )
                }
                className="bg-green-500 text-black py-4 rounded-2xl font-bold"
              >

                Mark Paid

              </button>

            </div>

            {/* FLOATING CHAT */}

            <button className="fixed bottom-8 right-6 w-16 h-16 rounded-full bg-green-500 text-black text-3xl shadow-2xl shadow-green-500/30">

              💬

            </button>

          </div>

        </div>

      )}

    </main>

  );

}