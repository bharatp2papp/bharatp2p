"use client";

import Link from "next/link";

import {
  useEffect,
  useState
} from "react";

import {
  ref,
  onValue,
  remove
} from "firebase/database";

import {
  signOut
} from "firebase/auth";

import {
  auth,
  db
} from "@/lib/firebase";

export default function DashboardPage() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [balance, setBalance] =
    useState(0);

  const [email, setEmail] =
    useState("");

  const [notifications, setNotifications] =
    useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {

    const savedEmail =
      localStorage.getItem(
        "bharatp2pUser"
      );

    if (!savedEmail) {

      window.location.href =
        "/login";

      return;

    }

    setEmail(savedEmail);

    const usersRef =
      ref(db, "users");

    onValue(usersRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        Object.keys(data).forEach((key) => {

          if (
            data[key].email ===
            savedEmail
          ) {

            setBalance(
              Number(
                data[key].balance || 0
              )
            );

          }

        });

      }

      setPageLoading(false);

    });

    const notificationRef =
      ref(db, "notifications");

    onValue(
      notificationRef,
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const formatted =
            Object.keys(data)
              .reverse()
              .map((key) => ({
                id: key,
                ...data[key]
              }));

          setNotifications(
            formatted
          );

        } else {

          setNotifications([]);

        }

      }
    );

  }, []);

  const logoutUser =
    async () => {

      localStorage.removeItem(
        "bharatp2pUser"
      );

      await signOut(auth);

      window.location.href =
        "/login";

    };

  const clearAllNotifications =
    async () => {

      try {

        await remove(
          ref(
            db,
            "notifications"
          )
        );

        setNotifications([]);

      } catch (err) {

        console.log(err);

      }

    };

  const removeNotification =
    async (id) => {

      try {

        await remove(
          ref(
            db,
            `notifications/${id}`
          )
        );

      } catch (err) {

        console.log(err);

      }

    };

  const handleShare =
    async () => {

      try {

        await navigator.share({

          title: "BharatP2P",

          text:
            "Join BharatP2P India Trusted Exchange",

          url:
            window.location.origin

        });

      } catch (err) {

        console.log(err);

      }

    };

  if (pageLoading) {

    return (

      <main className="fixed inset-0 bg-[#050816] flex items-center justify-center overflow-hidden z-[9999]">

        <div className="absolute w-[180px] h-[180px] bg-green-500/10 blur-3xl rounded-full" />

        <div className="text-center relative z-10 px-6">

          <div className="relative w-24 h-24 mx-auto">

            <div className="absolute inset-0 rounded-full border-[4px] border-green-400 border-t-transparent animate-spin shadow-[0_0_40px_#22c55e]" />

            <div className="absolute inset-[10px] rounded-full bg-[#020617] border border-white/10 flex items-center justify-center overflow-hidden">

              <div className="absolute inset-[5px] rounded-full border border-green-400/20" />

              <div className="flex items-center justify-center">

                <span className="text-green-400 text-[30px] font-black tracking-[-3px]">

                  BP

                </span>

                <span className="text-yellow-300 text-[30px] font-black -ml-1">

                  ⚡

                </span>

              </div>

            </div>

          </div>

          <h1 className="mt-6 text-3xl font-black text-white">

            BharatP2P

          </h1>

          <p className="text-gray-400 mt-2 text-sm">

            India Trusted Crypto Exchange

          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative p-4">

      {/* SIDEBAR */}

      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-[280px] bg-[#0b1020] border-r border-white/10 z-50 transition-transform duration-300 ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }`}>

        <div className="p-4 flex flex-col h-full">

          <div className="flex items-center justify-between">

            <h1 className="text-2xl font-black text-green-400">

              BharatP2P

            </h1>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="text-2xl"
            >

              ←

            </button>

          </div>

          <div className="mt-7 space-y-3">

            <Link href="/payment-methods">
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 text-sm font-semibold">
                💳 Payment Methods
              </div>
            </Link>

            <Link href="/referral">
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 text-sm font-semibold">
                🎁 Referral Tracking
              </div>
            </Link>

            <Link href="/support">
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 text-sm font-semibold">
                🎧 Support
              </div>
            </Link>

            <Link href="/faq">
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 text-sm font-semibold">
                ❓ FAQ
              </div>
            </Link>

            <Link href="/about">
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-4 text-sm font-semibold">
                ℹ️ About
              </div>
            </Link>

            <button
              onClick={logoutUser}
              className="w-full bg-red-500 text-white rounded-[22px] p-4 text-sm font-bold"
            >

              Logout

            </button>

          </div>

        </div>

      </div>

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40"
        />

      )}

      <div className="max-w-sm mx-auto relative z-10">

        {/* TOP */}

        <div className="flex items-center justify-between gap-2">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 text-2xl"
          >

            ☰

          </button>

          <div className="flex-1 overflow-hidden rounded-[18px] border border-white/10 bg-[#0d1324] py-3 px-4">

            <marquee
              className="text-xs font-bold"
              scrollamount="4"
            >

              ⚡ Instant P2P • 🔒 Secure • 💸 Fast Withdrawals • 🟢 Live Market

            </marquee>

          </div>

          <button
            onClick={() =>
              setNotificationOpen(true)
            }
            className="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 text-2xl relative"
          >

            🔔

            {notifications.length > 0 && (

              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center font-bold">

                {notifications.length}

              </div>

            )}

          </button>

        </div>

        {/* BRAND */}

        <div className="mt-6 text-center">

          <div className="w-16 h-16 rounded-[22px] mx-auto bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-400/20 flex items-center justify-center">

            <div className="w-11 h-11 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center">

              <span className="text-green-400 text-lg font-black">

                BP⚡

              </span>

            </div>

          </div>

          <h1 className="text-3xl font-black mt-4">

            BharatP2P

          </h1>

          <p className="text-gray-400 mt-1 text-sm">

            India Trusted Exchange

          </p>

          <div className="mt-3 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-[18px]">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <p className="text-xs text-gray-300 break-all">

              {email}

            </p>

          </div>

        </div>

        {/* WALLET */}

        <div className="mt-5 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 p-5 text-black shadow-[0_0_35px_rgba(34,197,94,0.30)]">

          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-black/10 blur-2xl" />

          <div className="relative flex items-center justify-between gap-4">

            <div>

              <div className="inline-flex items-center gap-2 bg-black/10 px-3 py-2 rounded-full">

                <div className="w-2 h-2 rounded-full bg-green-900 animate-pulse" />

                <p className="text-xs font-bold">

                  Secure Wallet

                </p>

              </div>

              <p className="text-sm font-bold mt-4">

                Wallet Balance

              </p>

              <h2 className="text-4xl font-black mt-2">

                {balance}

              </h2>

              <div className="mt-2 inline-flex px-3 py-2 rounded-full bg-black/10">

                <span className="text-sm font-black">

                  USDT

                </span>

              </div>

            </div>

            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">

              <div className="absolute inset-0 rounded-full bg-green-300/30 blur-2xl animate-pulse" />

              <div className="relative w-20 h-20 rounded-full bg-[#07111f] border-[4px] border-green-300 shadow-[0_0_30px_rgba(34,197,94,0.7)] flex items-center justify-center overflow-hidden">

                <div className="absolute inset-[5px] rounded-full border border-green-300/20" />

                <div className="absolute top-2 left-3 w-7 h-3 bg-white/20 blur-sm rotate-[-20deg]" />

                <div className="relative flex items-center justify-center">

                  <span className="text-green-400 text-[28px] font-black tracking-[-2px]">

                    BP

                  </span>

                  <span className="text-yellow-300 text-[28px] font-black -ml-1">

                    ⚡

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="grid grid-cols-2 gap-3 mt-5">

          <Link href="/deposit">
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
              <div className="text-4xl">💸</div>
              <h3 className="mt-3 text-lg font-bold">
                Deposit
              </h3>
            </div>
          </Link>

          <Link href="/buy">
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
              <div className="text-4xl">🟢</div>
              <h3 className="mt-3 text-lg font-bold">
                Buy
              </h3>
            </div>
          </Link>

          <Link href="/sell">
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
              <div className="text-4xl">🔴</div>
              <h3 className="mt-3 text-lg font-bold">
                Sell
              </h3>
            </div>
          </Link>

          <Link href="/orders">
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
              <div className="text-4xl">📦</div>
              <h3 className="mt-3 text-lg font-bold">
                Orders
              </h3>
            </div>
          </Link>

        </div>

        {/* REFERRAL */}

        <div className="mt-5 bg-white/5 border border-white/10 rounded-[28px] p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">

                Referral Bonus

              </h2>

              <p className="text-gray-400 mt-1 text-sm">

                Earn 5% Commission

              </p>

            </div>

            <div className="text-4xl">

              🎁

            </div>

          </div>

          <button
            onClick={handleShare}
            className="w-full mt-5 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm"
          >

            Share Referral

          </button>

        </div>

        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-6 pb-4 text-sm">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

      {/* NOTIFICATIONS */}

      {notificationOpen && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">

          <div className="w-full max-w-sm h-full bg-[#08111f] border-l border-white/10 p-5 overflow-y-auto">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-black">

                Notifications

              </h2>

              <button
                onClick={() =>
                  setNotificationOpen(false)
                }
                className="text-2xl text-red-400"
              >

                ✕

              </button>

            </div>

            {notifications.length > 0 && (

              <button
                onClick={clearAllNotifications}
                className="w-full mt-4 bg-red-500 text-white py-3 rounded-[18px] font-bold text-sm"
              >

                Clear All Notifications

              </button>

            )}

            <div className="mt-5 space-y-4">

              {notifications.length === 0 ? (

                <div className="bg-white/5 border border-white/10 rounded-[22px] p-5 text-center text-gray-400 text-sm">

                  No Notifications Found

                </div>

              ) : (

                notifications.map((item) => (

                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-[22px] p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h3 className="font-bold text-sm">

                          {item.title || "BharatP2P"}

                        </h3>

                        <p className="text-gray-400 text-sm mt-2 leading-6">

                          {item.message || "New Notification"}

                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeNotification(item.id)
                        }
                        className="text-red-400 text-lg"
                      >

                        ✕

                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      )}

    </main>

  );

}