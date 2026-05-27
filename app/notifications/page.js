"use client";

import {
  useState
} from "react";

import Link from "next/link";

export default function NotificationsPage() {

  const [notifications, setNotifications] =
    useState([

      {
        id: 1,
        title: "Deposit Successful",
        message: "Your deposit of ₹5,000 has been received successfully.",
        time: "2 min ago",
        color: "bg-green-500"
      },

      {
        id: 2,
        title: "Buy Order Pending",
        message: "Your USDT buy order is waiting for seller confirmation.",
        time: "10 min ago",
        color: "bg-yellow-500"
      },

      {
        id: 3,
        title: "Sell Order Completed",
        message: "Your sell order has been completed successfully.",
        time: "25 min ago",
        color: "bg-blue-500"
      },

      {
        id: 4,
        title: "Referral Bonus Added",
        message: "₹120 referral commission added to your wallet.",
        time: "1 hour ago",
        color: "bg-purple-500"
      }

    ]);

  const clearAll =
    () => {

      setNotifications([]);

    };

  const removeNotification =
    (id) => {

      setNotifications(
        notifications.filter(
          (item) =>
            item.id !== id
        )
      );

    };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      {/* TOP */}

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <Link href="/dashboard">

            <button className="text-3xl text-green-400">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Notifications

          </h1>

        </div>

        {notifications.length > 0 && (

          <button
            onClick={clearAll}
            className="bg-red-500 px-4 py-2 rounded-2xl text-sm font-bold"
          >

            Clear All

          </button>

        )}

      </div>

      {/* LIST */}

      <div className="mt-8 space-y-5">

        {notifications.length > 0 ? (

          notifications.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-6"
            >

              <div className="flex items-start gap-4">

                <div
                  className={`w-5 h-5 rounded-full mt-2 ${item.color}`}
                />

                <div className="flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <h2 className="text-xl font-bold">

                      {item.title}

                    </h2>

                    <button
                      onClick={() =>
                        removeNotification(
                          item.id
                        )
                      }
                      className="text-red-400 text-sm font-bold"
                    >

                      Remove

                    </button>

                  </div>

                  <p className="text-gray-500 text-sm mt-1">

                    {item.time}

                  </p>

                  <p className="text-gray-400 mt-4 leading-7">

                    {item.message}

                  </p>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-10 text-center">

            <div className="text-6xl">

              🔔

            </div>

            <h2 className="text-2xl font-black mt-5">

              No Notifications

            </h2>

            <p className="text-gray-400 mt-3">

              All notifications cleared successfully.

            </p>

          </div>

        )}

      </div>

      {/* FOOTER */}

      <p className="text-center text-gray-500 mt-10 pb-5">

        © 2026 BharatP2P. All Rights Reserved.

      </p>

    </main>

  );

}