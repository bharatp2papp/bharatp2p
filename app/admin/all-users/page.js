"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  ref,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function AllUsersPage() {

  const router =
    useRouter();

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          setUsers(
            Object.values(
              snapshot.val()
            ).reverse()
          );

        }

      }
    );

  }, []);

  const filtered =
    users.filter((item) =>
      item.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-10">

      <div className="max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              router.push("/admin/analytics")
            }
            className="text-3xl"
          >

            ←

          </button>

          <h1 className="text-3xl font-black">

            All Users

          </h1>

        </div>

        <input
          type="text"
          placeholder="Search Email..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#0d1324] p-5 rounded-3xl outline-none"
        />

        <div className="mt-8 space-y-5">

          {filtered.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[35px] p-5"
            >

              <p className="text-gray-400">

                User Email

              </p>

              <h2 className="font-bold break-all mt-2">

                {item.email}

              </h2>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-[#0d1324] p-4 rounded-2xl">

                  <p className="text-gray-400 text-sm">

                    Balance

                  </p>

                  <h2 className="font-bold mt-2 text-green-400">

                    {item.balance || 0} USDT

                  </h2>

                </div>

                <div className="bg-[#0d1324] p-4 rounded-2xl">

                  <p className="text-gray-400 text-sm">

                    Join Date

                  </p>

                  <h2 className="font-bold mt-2 text-sm">

                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      : "N/A"}

                  </h2>

                </div>

              </div>

              <div className="bg-[#0d1324] p-4 rounded-2xl mt-3">

                <p className="text-gray-400 text-sm">

                  Join Time

                </p>

                <h2 className="font-bold mt-2">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleTimeString()
                    : "N/A"}

                </h2>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}