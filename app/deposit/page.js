"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  push,
  get
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function DepositPage() {

  const [loading, setLoading] =
    useState(true);

  const [amount, setAmount] =
    useState("");

  const [trxid, setTrxid] =
    useState("");

  const [network, setNetwork] =
    useState("BEP20");

  const [walletAddress, setWalletAddress] =
    useState({
      BEP20: "",
      TRC20: ""
    });

  const [qrCode, setQrCode] =
    useState({
      BEP20: "",
      TRC20: ""
    });

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {

    loadPaymentSettings();

  }, []);

  const loadPaymentSettings =
    async () => {

      try {

        const snapshot =
          await get(
            ref(
              db,
              "paymentSettings"
            )
          );

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          setWalletAddress({

            BEP20:
              data.bep20Address || "",

            TRC20:
              data.trc20Address || ""

          });

          setQrCode({

            BEP20:
              data.bep20Qr || "",

            TRC20:
              data.trc20Qr || ""

          });

        }

      } catch (err) {

        console.log(err);

      } finally {

        setTimeout(() => {

          setLoading(false);

        }, 900);

      }

    };

  const copyWallet =
    () => {

      navigator.clipboard.writeText(
        walletAddress[network]
      );

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    };

  const submitDeposit =
    async () => {

      if (
        !amount ||
        !trxid
      ) {

        alert(
          "Fill all details"
        );

        return;

      }

      try {

        const userEmail =
          localStorage.getItem(
            "bharatp2pUser"
          ) || "";

        await push(

          ref(
            db,
            "deposits"
          ),

          {

            email:
              userEmail,

            amount,

            trxid,

            network,

            status:
              "Pending",

            createdAt:
              Date.now()

          }

        );

        alert(
          "Deposit Submitted"
        );

        setAmount("");

        setTrxid("");

      } catch (err) {

        console.log(err);

        alert(
          "Something went wrong"
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

      {copied && (

        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-black px-5 py-3 rounded-2xl font-black text-sm shadow-[0_0_30px_rgba(34,197,94,0.50)]">

          Wallet Address Copied

        </div>

      )}

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

            <div className="w-8" />

          </div>

          <h1 className="text-3xl font-black text-center mt-5">

            Deposit

          </h1>

          <p className="text-center text-gray-400 mt-2 text-sm leading-6">

            Send USDT and submit transaction details.

          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">

          <button
            onClick={() =>
              setNetwork("BEP20")
            }
            className={`py-4 rounded-[22px] font-black text-sm border ${
              network === "BEP20"
              ? "bg-gradient-to-r from-green-400 to-green-600 text-black border-green-400"
              : "bg-white/5 border-white/10"
            }`}
          >

            BEP20

          </button>

          <button
            onClick={() =>
              setNetwork("TRC20")
            }
            className={`py-4 rounded-[22px] font-black text-sm border ${
              network === "TRC20"
              ? "bg-gradient-to-r from-green-400 to-green-600 text-black border-green-400"
              : "bg-white/5 border-white/10"
            }`}
          >

            TRC20

          </button>

        </div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <div className="flex justify-center">

            {qrCode[network] ? (

              <img
                src={
                  qrCode[network]
                }
                alt="QR"
                className="w-44 h-44 rounded-[24px] bg-white p-2 object-cover"
              />

            ) : (

              <div className="w-44 h-44 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-sm">

                No QR Added

              </div>

            )}

          </div>

          <div
            onClick={copyWallet}
            className="mt-5 bg-[#0d1324] border border-white/5 rounded-[20px] p-4 active:scale-[0.98] transition cursor-pointer"
          >

            <div className="flex items-center justify-between gap-3">

              <p className="text-xs text-gray-400">

                Wallet Address

              </p>

              <span className="text-[11px] text-green-400 font-bold">

                TAP TO COPY

              </span>

            </div>

            <p className="text-sm text-green-400 break-all font-bold mt-3">

              {walletAddress[network] ||
                "No Address Added"}

            </p>

          </div>

        </div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <h2 className="text-lg font-black">

            Deposit Details

          </h2>

          <div className="mt-4 space-y-4">

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e)=>
                setAmount(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[20px] bg-[#0d1324] border border-white/5 outline-none focus:border-green-400/30"
            />

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={trxid}
              onChange={(e)=>
                setTrxid(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[20px] bg-[#0d1324] border border-white/5 outline-none focus:border-green-400/30"
            />

          </div>

          <button
            onClick={submitDeposit}
            className="w-full mt-5 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm shadow-xl shadow-green-500/20"
          >

            Submit Deposit

          </button>

        </div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

          <h2 className="text-lg font-black">

            Important Instructions

          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-300 leading-7">

            <p>

              • Send only USDT using selected network.

            </p>

            <p>

              • Enter correct transaction hash / TRX ID.

            </p>

            <p>

              • Deposits are reviewed within few minutes.

            </p>

            <p>

              • Wrong network transfers may result in loss of funds.

            </p>

          </div>

        </div>

        <p className="text-center text-gray-500 mt-6 pb-4 text-sm">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

    </main>

  );

}