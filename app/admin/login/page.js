"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  get,
  set
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function AdminLoginPage() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [savedUsername, setSavedUsername] =
    useState("");

  const [savedPassword, setSavedPassword] =
    useState("");

  const [showRecovery, setShowRecovery] =
    useState(false);

  const [recoveryKey, setRecoveryKey] =
    useState("");

  const [newUsername, setNewUsername] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {

    loadAdmin();

  }, []);

  const loadAdmin =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            "adminSettings"
          )
        );

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        setSavedUsername(
          data.username || "admin"
        );

        setSavedPassword(
          data.password || "admin123"
        );

      } else {

        await set(

          ref(
            db,
            "adminSettings"
          ),

          {
            username:
              "admin",

            password:
              "admin123",

            recoveryKey:
              "BHARATP2P2026MASTER"
          }

        );

        setSavedUsername(
          "admin"
        );

        setSavedPassword(
          "admin123"
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const loginAdmin = () => {

    if (
      username === savedUsername &&
      password === savedPassword
    ) {

      localStorage.setItem(
        "bharatp2pAdmin",
        "true"
      );

      alert(
        "Login Successful"
      );

      window.location.href =
        "/admin";

    } else {

      alert(
        "Invalid Login Details"
      );

    }

  };

  const resetPassword =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            "adminSettings"
          )
        );

      if (!snapshot.exists()) {

        alert(
          "Admin data missing"
        );

        return;

      }

      const data =
        snapshot.val();

      if (
        recoveryKey !==
        data.recoveryKey
      ) {

        alert(
          "Invalid Recovery Key"
        );

        return;

      }

      await set(

        ref(
          db,
          "adminSettings"
        ),

        {
          username:
            newUsername,

          password:
            newPassword,

          recoveryKey:
            data.recoveryKey
        }

      );

      alert(
        "Admin Updated Successfully"
      );

      setShowRecovery(false);

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    }

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[35px] p-8">

        <h1 className="text-4xl font-black text-center text-green-400">

          BharatP2P

        </h1>

        <p className="text-center text-gray-400 mt-3">

          Admin Login Panel

        </p>

        {!showRecovery ? (

          <>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e)=>
                  setUsername(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-3xl bg-[#0d1324] outline-none"
              />

              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-3xl bg-[#0d1324] outline-none"
              />

            </div>

            <button
              onClick={loginAdmin}
              className="w-full mt-8 bg-green-500 text-black py-5 rounded-3xl font-bold text-lg"
            >

              Login

            </button>

            <button
              onClick={() =>
                setShowRecovery(true)
              }
              className="w-full mt-5 text-gray-400"
            >

              Forgot Password?

            </button>

          </>

        ) : (

          <>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Recovery Key"
                value={recoveryKey}
                onChange={(e)=>
                  setRecoveryKey(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-3xl bg-[#0d1324] outline-none"
              />

              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e)=>
                  setNewUsername(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-3xl bg-[#0d1324] outline-none"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-3xl bg-[#0d1324] outline-none"
              />

            </div>

            <button
              onClick={resetPassword}
              className="w-full mt-8 bg-green-500 text-black py-5 rounded-3xl font-bold text-lg"
            >

              Reset Admin

            </button>

            <button
              onClick={() =>
                setShowRecovery(false)
              }
              className="w-full mt-5 text-gray-400"
            >

              Back To Login

            </button>

          </>

        )}

      </div>

    </main>

  );

}