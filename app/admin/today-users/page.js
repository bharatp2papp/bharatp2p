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

export default function TodayUsersPage() {

  const router =
    useRouter();

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    onValue(
      ref(db, "users"),
      (snapshot) => {

        if (snapshot.exists()) {

          const now =
            new Date();

          const arr =
            Object.values(
              snapshot.val()
            ).filter((item) => {

              if (!item.createdAt)
                return false;

              const d =
                new Date(
                  item.createdAt
                );

              return (
                d.toDateString() ===
                now.toDateString()
              );

            });

          setUsers(arr.reverse());

        }

      }
    );

  }, []);

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

            Today Users

          </h1>

        </div>

        <div className="mt-8 space-y-5">

          {users.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[35px] p-5"
            >

              <h2 className="font-bold break-all">

                {item.email}

              </h2>

              <div className="mt-4 bg-[#0d1324] p-4 rounded-2xl">

                <p className="text-gray-400 text-sm">

                  Joined

                </p>

                <h2 className="font-bold mt-2">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
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