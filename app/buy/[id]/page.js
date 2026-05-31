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

export default function BuyOrderPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [seller, setSeller] =
    useState(null);

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [creatingOrder, setCreatingOrder] =
    useState(false);

  useEffect(() => {

    loadSeller();

  }, []);

  const loadSeller =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            `buyListings/${params.id}`
          )
        );

      if (snapshot.exists()) {

        setSeller(
          snapshot.val()
        );

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const usdt =
    amount &&
    seller
      ? (
          parseFloat(amount) /
          parseFloat(
            seller.price
          )
        ).toFixed(2)
      : 0;

  const createOrder =
    async () => {

    if (!amount) {

      return;

    }

    try {

      setCreatingOrder(true);

      const user =
        localStorage.getItem(
          "bharatp2pUser"
        );

      const orderRef =
        push(
          ref(
            db,
            "buyOrders"
          )
        );

      const orderId =
        orderRef.key;

      const orderData = {

        orderId,

        email: user,

        buyer: user,

        seller:
          seller.sellerName,

        type: "Buy",

        amount,

        usdt,

        status: "Pending",

        createdAt:
          Date.now(),

        paymentTime:
          Date.now(),

        price:
          seller.price,

        upi:
          seller.upi || "",

        bankName:
          seller.bankName || "",

        accountName:
          seller.accountName || "",

        accountNumber:
          seller.accountNumber || "",

        ifsc:
          seller.ifsc || "",

        upiEnabled:
          seller.upiEnabled || false,

        bankEnabled:
          seller.bankEnabled || false

      };

      await set(
        orderRef,
        orderData
      );

      router.push(
        `/buy-order/${orderId}`
      );

    } catch (err) {

      console.log(err);

    } finally {

      setCreatingOrder(false);

    }

  };

  if (
    loading ||
    creatingOrder
  ) {

    return (

      <main className="min-h-screen bg-[#050816] flex items-center justify-center text-white overflow-hidden">

        <div className="text-center">

          <div className="relative w-28 h-28 mx-auto">

            <div className="absolute inset-0 rounded-full border-4 border-green-400 border-t-transparent animate-spin shadow-[0_0_35px_#22c55e]" />

            <div className="absolute inset-[10px] rounded-full bg-[#0b1020] border border-white/10 flex items-center justify-center shadow-2xl">

              <div className="text-3xl font-black text-green-400 tracking-wider">

                BP⚡

              </div>

            </div>

          </div>

          <h2 className="mt-8 text-4xl font-black text-green-400">

            BharatP2P

          </h2>

          <p className="text-gray-400 mt-3 text-lg">

            India Trusted Crypto Exchange

          </p>

        </div>

      </main>

    );

  }

  if (!seller) {

    return (

      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        Seller Not Found

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="flex items-center gap-4">

        <Link href="/buy">

          <button className="text-3xl text-green-400">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          Buy USDT

        </h1>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold">

              {seller.sellerName}

            </h2>

            <p className="text-green-400 mt-2">

              Verified Seller

            </p>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-black text-green-400">

              ₹{seller.price}

            </h2>

            <p className="text-gray-400">

              per USDT

            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <h2 className="text-2xl font-bold">

          Enter INR Amount

        </h2>

        <input
          value={amount}
          onChange={(e)=>
            setAmount(
              e.target.value
            )
          }
          placeholder="Enter INR Amount"
          className="w-full mt-5 p-5 rounded-2xl bg-[#0d1324] outline-none text-xl"
        />

        <div className="mt-5 bg-[#0d1324] rounded-2xl p-5">

          <p className="text-gray-400">

            You Will Receive

          </p>

          <h2 className="text-4xl font-black text-green-400 mt-3">

            {usdt} USDT

          </h2>

        </div>

      </div>

      <button
        onClick={createOrder}
        className="w-full mt-8 bg-green-500 text-black py-5 rounded-2xl font-black text-xl"
      >

        Submit Order

      </button>

    </main>

  );

}