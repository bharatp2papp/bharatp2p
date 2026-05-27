"use client";

import {
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  get,
  update,
  push
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function WalletControlPage() {

  const [email, setEmail] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [currentBalance, setCurrentBalance] =
    useState(null);

  const [userKey, setUserKey] =
    useState("");

  const findUser =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            "users"
          )
        );

      if (!snapshot.exists()) {

        alert(
          "No users found"
        );

        return;

      }

      const data =
        snapshot.val();

      let found = false;

      Object.keys(data).forEach((key) => {

        if (
          data[key].email === email
        ) {

          found = true;

          setUserKey(key);

          setCurrentBalance(
            Number(
              data[key].balance || 0
            )
          );

        }

      });

      if (!found) {

        alert(
          "User not found"
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const saveHistory =
    async (
      type,
      finalBalance
    ) => {

    await push(

      ref(
        db,
        "walletHistory"
      ),

      {
        email,
        type,
        amount,
        note,

        finalBalance,

        createdAt:
          Date.now()
      }

    );

    await push(

      ref(
        db,
        "notifications"
      ),

      {
        message:
          `${note} (${type} ${amount} USDT)`,

        createdAt:
          Date.now()
      }

    );

  };

  const addBalance =
    async () => {

    if (
      !userKey ||
      !amount
    ) {

      alert(
        "Check user first"
      );

      return;

    }

    try {

      setLoading(true);

      const newBalance =
        Number(currentBalance) +
        Number(amount);

      await update(

        ref(
          db,
          `users/${userKey}`
        ),

        {
          balance:
            newBalance
        }

      );

      await saveHistory(
        "PLUS",
        newBalance
      );

      setCurrentBalance(
        newBalance
      );

      alert(
        "Balance Added"
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const minusBalance =
    async () => {

    if (
      !userKey ||
      !amount
    ) {

      alert(
        "Check user first"
      );

      return;

    }

    try {

      setLoading(true);

      const newBalance =
        Number(currentBalance) -
        Number(amount);

      await update(

        ref(
          db,
          `users/${userKey}`
        ),

        {
          balance:
            newBalance
        }

      );

      await saveHistory(
        "MINUS",
        newBalance
      );

      setCurrentBalance(
        newBalance
      );

      alert(
        "Balance Deducted"
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const setBalance =
    async () => {

    if (
      !userKey ||
      !amount
    ) {

      alert(
        "Check user first"
      );

      return;

    }

    try {

      setLoading(true);

      await update(

        ref(
          db,
          `users/${userKey}`
        ),

        {
          balance:
            Number(amount)
        }

      );

      await saveHistory(
        "SET",
        Number(amount)
      );

      setCurrentBalance(
        Number(amount)
      );

      alert(
        "Balance Updated"
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between">

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Wallet Control

          </h1>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <button
            onClick={findUser}
            className="w-full bg-white/10 py-4 rounded-3xl font-bold"
          >

            Check User

          </button>

          {currentBalance !== null && (

            <div className="bg-green-500 text-black p-5 rounded-3xl text-center">

              <p className="text-lg font-bold">

                Current Balance

              </p>

              <h2 className="text-4xl font-black mt-2">

                {currentBalance} USDT

              </h2>

            </div>

          )}

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=>
              setAmount(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <textarea
            placeholder="Note / Reason"
            value={note}
            onChange={(e)=>
              setNote(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none h-32"
          />

        </div>

        <div className="grid grid-cols-3 gap-3 mt-8">

          <button
            onClick={addBalance}
            disabled={loading}
            className="bg-green-500 text-black py-4 rounded-3xl font-bold"
          >

            + Add

          </button>

          <button
            onClick={minusBalance}
            disabled={loading}
            className="bg-red-500 text-white py-4 rounded-3xl font-bold"
          >

            - Minus

          </button>

          <button
            onClick={setBalance}
            disabled={loading}
            className="bg-blue-500 text-white py-4 rounded-3xl font-bold"
          >

            Set

          </button>

        </div>

      </div>

    </main>

  );

}