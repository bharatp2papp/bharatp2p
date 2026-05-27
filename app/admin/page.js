"use client";

import Link from "next/link";

export default function AdminDashboardPage() {

  const logoutAdmin = () => {

    localStorage.removeItem(
      "bharatp2pAdmin"
    );

    window.location.href =
      "/admin/login";

  };

  const cards = [

    {
      title: "Deposits",
      icon: "💰",
      link: "/admin/deposit-requests"
    },

    {
      title: "Buy Orders",
      icon: "🟢",
      link: "/admin/buy-orders"
    },

    {
      title: "Sell Orders",
      icon: "🔴",
      link: "/admin/sell-orders"
    },

    {
      title: "Wallet",
      icon: "🪙",
      link: "/admin/wallet"
    },

    {
      title: "Deposit",
      icon: "📥",
      link: "/admin/deposit-settings"
    },

    {
      title: "Buy List",
      icon: "📈",
      link: "/admin/buy-listings"
    },

    {
      title: "Sell List",
      icon: "📉",
      link: "/admin/sell-listings"
    },

    {
      title: "Support",
      icon: "🎧",
      link: "/admin/support-control"
    },

    {
      title: "Broadcast",
      icon: "📢",
      link: "/admin/settings"
    },

    {
      title: "Analytics",
      icon: "📊",
      link: "/admin/analytics"
    },

    {
      title: "Wallet Logs",
      icon: "📜",
      link: "/admin/wallet-history"
    },

    {
      title: "Security",
      icon: "🛡️",
      link: "/admin/security"
    }

  ];

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-4">

        <div>

          <h1 className="text-4xl font-black text-green-400">

            BharatP2P

          </h1>

          <p className="text-gray-400 mt-1 text-sm">

            Professional Admin Control Panel

          </p>

        </div>

        <button
          onClick={logoutAdmin}
          className="bg-red-500 px-4 py-3 rounded-2xl font-bold text-sm"
        >

          Logout

        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-3 gap-3 mt-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

          <h2 className="text-2xl font-black text-green-400">

            ₹

          </h2>

          <p className="text-xs text-gray-400 mt-2">

            Exchange

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

          <h2 className="text-2xl font-black text-yellow-400">

            ⚡

          </h2>

          <p className="text-xs text-gray-400 mt-2">

            Live Admin

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

          <h2 className="text-2xl font-black text-red-400">

            🔒

          </h2>

          <p className="text-xs text-gray-400 mt-2">

            Secure

          </p>

        </div>

      </div>

      {/* MENU */}

      <div className="grid grid-cols-3 gap-3 mt-8">

        {cards.map((item, index) => (

          <Link
            key={index}
            href={item.link}
          >

            <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 active:scale-95 transition-all">

              <div className="text-3xl">

                {item.icon}

              </div>

              <h2 className="mt-3 text-sm font-black leading-tight">

                {item.title}

              </h2>

            </div>

          </Link>

        ))}

      </div>

      {/* FOOTER */}

      <div className="mt-12 text-center text-gray-500 text-sm">

        © 2026 BharatP2P Exchange. All Rights Reserved.

      </div>

    </main>

  );

}