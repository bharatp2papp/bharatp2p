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

import {
  db
} from "@/lib/firebase";

export default function ReferralPage() {

  const [showTerms, setShowTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [userData, setUserData] =
    useState(null);

  const [referrals, setReferrals] =
    useState([]);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 900);

  }, []);

  useEffect(() => {

    const email =
      localStorage.getItem(
        "bharatp2pUser"
      );

    if (!email)
      return;

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (!snapshot.exists())
          return;

        const users =
          snapshot.val();

        let currentUser = null;

        const referralUsers = [];

        for (const key in users) {

          if (users[key].email === email) {
            currentUser = users[key];
          }

        }

        if (currentUser) {

          for (const key in users) {

            if (users[key]?.referredBy === currentUser?.referralCode) {
              referralUsers.push(users[key]);
            }

          }

        }

        console.log("CURRENT USER =", currentUser);
        setUserData(currentUser);
        setReferrals(referralUsers);

      }
    );

  }, []);

  console.log(userData);

  const referCode =
    userData?.referralCode ||
    userData?.email?.split("@")[0]?.toUpperCase() ||
    "NO-CODE";

  const referLink =

  const shareReferral =
    async () => {

      try {

        if (navigator.share) {

          await navigator.share({
            title: "BharatP2P",
            text: "Join BharatP2P and earn referral rewards.",
            url: referLink
          });

        } else {

          navigator.clipboard.writeText(
            referLink
          );

          alert(
            "Referral Link Copied"
          );

        }

      } catch (err) {

        alert(
          "Sharing Cancelled"
        );

      }

    };

  if (loading) {

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

    <main className="min-h-screen bg-[#050816] text-white p-4 overflow-hidden relative">

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="max-w-sm mx-auto relative z-10">

        <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <Link href="/dashboard">

              <button className="text-2xl text-green-400">

                ←

              </button>

            </Link>

            <div className="w-14 h-14 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.20)]">

              <span className="text-green-400 text-xl font-black tracking-[-2px]">

                BP

              </span>

              <span className="text-yellow-300 text-xl font-black -ml-1">

                ⚡

              </span>

            </div>

            <button
              onClick={() =>
                setShowTerms(true)
              }
              className="text-xs bg-white/5 border border-white/10 px-3 py-2 rounded-xl"
            >

              Terms

            </button>

          </div>

          <h1 className="text-3xl font-black text-center mt-5">

            Referral Tracking

          </h1>

          <p className="text-center text-gray-400 mt-2 text-sm leading-6">

            Invite users and earn lifetime rewards.

          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">

            <div className="bg-[#0d1324] border border-white/5 rounded-[22px] p-4 text-center">

              <div className="text-3xl">

                💰

              </div>

              <h2 className="text-2xl font-black mt-2 text-green-400">

                5%

              </h2>

              <p className="text-gray-400 text-xs mt-1 leading-5">

                Deposit Commission

              </p>

            </div>

            <div className="bg-[#0d1324] border border-white/5 rounded-[22px] p-4 text-center">

              <div className="text-3xl">

                📈

              </div>

              <h2 className="text-2xl font-black mt-2 text-yellow-300">

                1%

              </h2>

              <p className="text-gray-400 text-xs mt-1 leading-5">

                P2P Trade Commission

              </p>

            </div>

          </div>

          <div className="mt-6 bg-[#0d1324] border border-white/5 rounded-[22px] p-4">

            <p className="text-xs text-gray-400 mb-2">

              Referral Link

            </p>

            <p className="break-all text-sm text-green-400 font-bold">

              {referLink}

            </p>

          </div>

          <button
            onClick={shareReferral}
            className="w-full mt-5 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm shadow-xl shadow-green-500/20"
          >

            Share Referral Link

          </button>

        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 text-center backdrop-blur-xl">

            <div className="text-2xl">

              👥

            </div>

            <h2 className="text-3xl font-black mt-2">

              {referrals.length}

            </h2>

            <p className="text-gray-400 text-xs mt-1">

              Total Referrals

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 text-center backdrop-blur-xl">

            <div className="text-2xl">

              💸

            </div>

            <h2 className="text-3xl font-black mt-2 text-green-400">

              ₹{userData?.referralEarnings || 0}

            </h2>

            <p className="text-gray-400 text-xs mt-1">

              Total Earnings

            </p>

          </div>

        </div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

          <h2 className="text-lg font-black">

            Referral Benefits

          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-300 leading-6">

            <p>

              • Earn 5% commission when your referred user deposits 50 USDT or more.

            </p>

            <p>

              • Earn 1% commission on every successful P2P trade completed by your referrals.

            </p>

            <p>

              • Lifetime commission tracking for all active referrals.

            </p>

            <p>

              • Instant reward system with secure tracking.

            </p>

          </div>

        </div>

        <p className="text-center text-gray-500 mt-6 pb-4 text-sm">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

      {showTerms && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">

          <div className="w-full max-w-sm bg-[#08111f] border border-white/10 rounded-[28px] p-5 max-h-[85vh] overflow-y-auto">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-black">

                Terms & Conditions

              </h2>

              <button
                onClick={() =>
                  setShowTerms(false)
                }
                className="text-2xl text-red-400"
              >

                ✕

              </button>

            </div>

            <div className="mt-5 space-y-4 text-sm text-gray-300 leading-7">

              <p>
                1. Users will receive a 5% referral commission only when the referred user completes a successful deposit of 50 USDT or more.
              </p>

              <p>
                2. Referrers are eligible to receive 1% commission on every completed P2P trade made by users connected through their referral code.
              </p>

              <p>
                3. Referral rewards are applicable only for genuine and verified users.
              </p>

              <p>
                4. BharatP2P reserves the right to suspend rewards for fraudulent activity, fake accounts, abuse, self-referrals or suspicious transactions.
              </p>

              <p>
                5. Referral commissions may take time to reflect depending on transaction verification and system processing.
              </p>

              <p>
                6. BharatP2P reserves the right to update or modify the referral program and commission structure at any time without prior notice.
              </p>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}