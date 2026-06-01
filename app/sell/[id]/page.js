"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useRouter
} from "next/navigation";

import Link from "next/link";

import {
  ref,
  get,
  push,
  set
} from "firebase/database";

import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function SellOrderPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [buyer, setBuyer] =
    useState(null);

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadBuyer();

  }, []);

  const loadBuyer =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            `sellListings/${params.id}`
          )
        );

      if (snapshot.exists()) {
        console.log("BUYER DATA =", snapshot.val());
        console.log("BUYER DATA =", snapshot.val());
        console.log("BUYER DATA =", snapshot.val());

        setBuyer(
          snapshot.val()
        );

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const inr =
    amount &&
    buyer
      ? (
          parseFloat(amount) *
          parseFloat(
            buyer.price
          )
        ).toFixed(2)
      : 0;

  const submitSell =
    async () => {

    if (!amount) {

      return;

    }

    try {

      const user =
        localStorage.getItem(
          "bharatp2pUser"
        );


      const usersSnapshot = await get(ref(db, "users"));

      let currentBalance = 0;

      if (usersSnapshot.exists()) {
        const users = usersSnapshot.val();

        Object.keys(users).forEach((key) => {
          if (users[key].email === user) {
            console.log("MATCHED =", users[key].email);
            console.log("BALANCE DB =", users[key].balance);
            currentBalance = Number(users[key].balance || 0);
          }
        });
      }

      console.log("BALANCE =", currentBalance);
      console.log("SELL AMOUNT =", Number(amount));
      if (currentBalance < Number(amount)) {
        toast.error("Insufficient Balance");
        return;
      }

      console.log("PASS BALANCE CHECK");
      let paymentData = {};

      /* BANK FETCH */

      console.log("FETCH BANK");
      const bankSnapshot =
        await get(
          ref(
            db,
            "bank-methods"
          )
        );

      if (
        bankSnapshot.exists()
      ) {

        const bankData =
          Object.values(
            bankSnapshot.val()
          )[0];

        paymentData = {

          userBankName:
            bankData.bankName || "",

          userAccountName:
            bankData.accountName || "",

          userAccountNumber:
            bankData.accountNumber || "",

          userIfsc:
            bankData.ifsc || ""

        };

      }

      /* UPI FETCH */

      console.log("FETCH UPI");
      const upiSnapshot =
        await get(
          ref(
            db,
            "upi-methods"
          )
        );

      if (
        upiSnapshot.exists()
      ) {

        const upiData =
          Object.values(
            upiSnapshot.val()
          )[0];

        paymentData.userUpi =
          upiData.upiId || "";

      }

      console.log("CREATE ORDER");
      const orderRef =
        push(
          ref(
            db,
            "sellOrders"
          )
        );

      const orderId =
        orderRef.key;

      await set(
        orderRef,
        {

          orderId,

          email: user,

          type: "Sell",

          seller: user,

          buyer:
            buyer.buyerName,

          usdt: amount,

          amount: inr,

          status: "Pending",

          createdAt:
            Date.now(),

          paymentTime:
            Date.now(),

          ...paymentData

        }
      );

      router.push(
        `/sell-order/${orderId}`
      );

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050816] flex items-center justify-center text-white overflow-hidden">

        <div className="text-center">

          <div className="relative w-28 h-28 mx-auto">

            <div className="absolute inset-0 rounded-full border-4 border-red-400 border-t-transparent animate-spin shadow-[0_0_35px_#ef4444]" />

            <div className="absolute inset-[10px] rounded-full bg-[#0b1020] border border-white/10 flex items-center justify-center shadow-2xl">

              <div className="text-3xl font-black text-red-400 tracking-wider">

                BP⚡

              </div>

            </div>

          </div>

          <h2 className="mt-8 text-4xl font-black text-red-400">

            BharatP2P

          </h2>

          <p className="text-gray-400 mt-3 text-lg">

            India Trusted Crypto Exchange

          </p>

        </div>

      </main>

    );

  }

  if (!buyer) {

    return (

      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        Buyer Not Found

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="flex items-center gap-4">

        <Link href="/sell">

          <button className="text-3xl text-red-400">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          Sell USDT

        </h1>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold">

              {buyer.buyerName}

            </h2>

            <p className="text-red-400 mt-2">

              Verified Buyer

            </p>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-black text-red-400">

              ₹{buyer.price}

            </h2>

            <p className="text-gray-400">

              per USDT

            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <h2 className="text-2xl font-bold">

          Enter USDT Amount

        </h2>

        <input
          value={amount}
          onChange={(e)=>
            setAmount(
              e.target.value
            )
          }
          placeholder="Enter USDT Amount"
          className="w-full mt-5 p-5 rounded-2xl bg-[#0d1324] outline-none text-xl"
        />

        <div className="mt-5 bg-[#0d1324] rounded-2xl p-5">

          <p className="text-gray-400">

            You Will Receive

          </p>

          <h2 className="text-4xl font-black text-red-400 mt-3">

            ₹{inr}

          </h2>

        </div>

      </div>

      <button
        onClick={submitSell}
        className="w-full mt-8 bg-red-500 text-white py-5 rounded-2xl font-black text-xl"
      >

        Submit Sell Order

      </button>

    </main>

  );

}