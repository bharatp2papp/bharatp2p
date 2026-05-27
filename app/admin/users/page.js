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

export default function UsersPage() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [buyOrders, setBuyOrders] =
    useState([]);

  const [sellOrders, setSellOrders] =
    useState([]);

  const [deposits, setDeposits] =
    useState([]);

  const [selectedReason, setSelectedReason] =
    useState({});

  const [customReason, setCustomReason] =
    useState({});

  useEffect(() => {

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.val();

          const arr =
            Object.keys(data).map((key) => ({
              id: key,
              ...data[key]
            }));

          setUsers(arr.reverse());

        }

      }
    );

    onValue(
      ref(db, "buyOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          setBuyOrders(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

    onValue(
      ref(db, "sellOrders"),
      (snapshot) => {

        if (snapshot.exists()) {

          setSellOrders(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

    onValue(
      ref(db, "deposits"),
      (snapshot) => {

        if (snapshot.exists()) {

          setDeposits(
            Object.values(
              snapshot.val()
            )
          );

        }

      }
    );

  }, []);

  const filteredUsers =
    users.filter((item) =>
      item.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const getUserDeposits =
    (email) => {

      return deposits
        .filter(
          (item) =>
            item.email ===
            email
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.amount || 0
            ),
          0
        );

    };

  const getUserBuy =
    (email) => {

      return buyOrders
        .filter(
          (item) =>
            item.buyer ===
            email
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.usdt || 0
            ),
          0
        );

    };

  const getUserSell =
    (email) => {

      return sellOrders
        .filter(
          (item) =>
            item.seller ===
            email
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.usdt || 0
            ),
          0
        );

    };

  const toggleBlock =
    async (item) => {

    try {

      if (!item.blocked) {

        const reason =
          customReason[item.id] ||
          selectedReason[item.id] ||
          "Violation Of Platform Rules";

        await update(

          ref(
            db,
            `users/${item.id}`
          ),

          {
            blocked: true,
            blockedReason:
              reason,
            blockedAt:
              Date.now()
          }

        );

        alert(
          "User Blocked"
        );

      } else {

        await update(

          ref(
            db,
            `users/${item.id}`
          ),

          {
            blocked: false,
            blockedReason: "",
            blockedAt: null
          }

        );

        alert(
          "User Unblocked"
        );

      }

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <Link href="/admin">

            <button className="text-3xl">

              ←

            </button>

          </Link>

          <h1 className="text-3xl font-black">

            Users Analytics

          </h1>

        </div>

        <input
          type="text"
          placeholder="Search User Email..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        <div className="mt-8 space-y-5">

          {filteredUsers.length > 0 ? (

            filteredUsers.map((item) => (

              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-[35px] p-5"
              >

                <div className="space-y-4">

                  <div>

                    <p className="text-gray-400">

                      User Email

                    </p>

                    <h2 className="font-bold break-all mt-1">

                      {item.email}

                    </h2>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Wallet Balance

                      </p>

                      <h2 className="font-bold mt-2 text-green-400">

                        {item.balance || 0} USDT

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Status

                      </p>

                      <h2 className={`font-bold mt-2 ${
                        item.blocked
                        ? "text-red-400"
                        : "text-green-400"
                      }`}>

                        {item.blocked
                          ? "Blocked"
                          : "Active"}

                      </h2>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Total Deposits

                      </p>

                      <h2 className="font-bold mt-2 text-yellow-400">

                        {getUserDeposits(item.email)} USDT

                      </h2>

                    </div>

                    <div className="bg-[#0d1324] p-4 rounded-2xl">

                      <p className="text-gray-400 text-sm">

                        Total Buy

                      </p>

                      <h2 className="font-bold mt-2 text-green-400">

                        {getUserBuy(item.email)} USDT

                      </h2>

                    </div>

                  </div>

                  <div className="bg-[#0d1324] p-4 rounded-2xl">

                    <p className="text-gray-400 text-sm">

                      Total Sell

                    </p>

                    <h2 className="font-bold mt-2 text-red-400">

                      {getUserSell(item.email)} USDT

                    </h2>

                  </div>

                  {item.blocked && item.blockedReason && (

                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">

                      <p className="text-red-400 text-sm">

                        Block Reason

                      </p>

                      <h2 className="font-bold mt-2 text-red-300">

                        {item.blockedReason}

                      </h2>

                    </div>

                  )}

                  {!item.blocked && (

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
                        className="w-full bg-[#0d1324] p-4 rounded-2xl outline-none"
                      >

                        <option value="">

                          Select Block Reason

                        </option>

                        <option value="Fake Deposit Activity">

                          Fake Deposit Activity

                        </option>

                        <option value="Suspicious Trading">

                          Suspicious Trading

                        </option>

                        <option value="Spam Activity">

                          Spam Activity

                        </option>

                        <option value="Multiple Fake Requests">

                          Multiple Fake Requests

                        </option>

                        <option value="Fraud Attempt">

                          Fraud Attempt

                        </option>

                      </select>

                      <input
                        type="text"
                        placeholder="Custom Reason (Optional)"
                        value={
                          customReason[
                            item.id
                          ] || ""
                        }
                        onChange={(e)=>
                          setCustomReason({
                            ...customReason,
                            [item.id]:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#0d1324] p-4 rounded-2xl outline-none"
                      />

                    </>

                  )}

                  <button
                    onClick={() =>
                      toggleBlock(item)
                    }
                    className={`w-full py-4 rounded-2xl font-bold ${
                      item.blocked
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                    }`}
                  >

                    {item.blocked
                      ? "Unblock User"
                      : "Block User"}

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 text-center text-gray-400">

              No Users Found

            </div>

          )}

        </div>

      </div>

    </main>

  );

}