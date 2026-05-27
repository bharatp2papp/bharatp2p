"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { initializeApp } from "firebase/app";

import {
  getDatabase,
  ref,
  onValue,
  remove,
  update
} from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "bharatp2p-cfee3.firebaseapp.com",
  databaseURL: "https://bharatp2p-cfee3-default-rtdb.firebaseio.com",
  projectId: "bharatp2p-cfee3",
  storageBucket: "bharatp2p-cfee3.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default function SavedCards() {

  const [upiList, setUpiList] = useState([]);

  const [bankList, setBankList] = useState([]);

  const [editUpiId, setEditUpiId] = useState(null);
  const [editUpiName, setEditUpiName] = useState("");
  const [editUpiValue, setEditUpiValue] = useState("");

  const [editBankId, setEditBankId] = useState(null);

  const [editHolder, setEditHolder] = useState("");
  const [editAccount, setEditAccount] = useState("");
  const [editIfsc, setEditIfsc] = useState("");
  const [editBankName, setEditBankName] = useState("");

  useEffect(() => {

    const upiRef = ref(db, "upiCards");

    onValue(upiRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const arr = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...value
          })
        );

        setUpiList(arr);

      } else {

        setUpiList([]);

      }

    });

    const bankRef = ref(db, "bankCards");

    onValue(bankRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const arr = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...value
          })
        );

        setBankList(arr);

      } else {

        setBankList([]);

      }

    });

  }, []);

  // DELETE

  const deleteUpi = async (id) => {

    await remove(
      ref(db, `upiCards/${id}`)
    );

  };

  const deleteBank = async (id) => {

    await remove(
      ref(db, `bankCards/${id}`)
    );

  };

  // UPDATE UPI

  const saveUpiEdit = async () => {

    await update(
      ref(db, `upiCards/${editUpiId}`),
      {
        name: editUpiName,
        upi: editUpiValue
      }
    );

    setEditUpiId(null);

  };

  // UPDATE BANK

  const saveBankEdit = async () => {

    await update(
      ref(db, `bankCards/${editBankId}`),
      {
        holder: editHolder,
        account: editAccount,
        ifsc: editIfsc,
        bankName: editBankName
      }
    );

    setEditBankId(null);

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5">

      {/* TOP */}

      <div className="flex items-center gap-4">

        <Link href="/dashboard">

          <button className="text-3xl text-green-400">
            ←
          </button>

        </Link>

        <h1 className="text-3xl font-black">
          Saved Cards
        </h1>

      </div>

      {/* UPI */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold">
          Saved UPI Cards
        </h2>

        <div className="mt-5 space-y-4">

          {upiList.map((u)=>(

            <div
              key={u.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-5"
            >

              {editUpiId === u.id ? (

                <>

                  <input
                    value={editUpiName}
                    onChange={(e)=>
                      setEditUpiName(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324]"
                  />

                  <input
                    value={editUpiValue}
                    onChange={(e)=>
                      setEditUpiValue(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324] mt-3"
                  />

                  <button
                    onClick={saveUpiEdit}
                    className="mt-4 w-full bg-green-500 text-black py-3 rounded-2xl font-bold"
                  >
                    Save
                  </button>

                </>

              ) : (

                <>

                  <h2 className="font-bold text-lg">
                    {u.name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {u.upi}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => {

                        setEditUpiId(u.id);

                        setEditUpiName(u.name);

                        setEditUpiValue(u.upi);

                      }}
                      className="flex-1 bg-yellow-500 text-black py-3 rounded-2xl font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUpi(u.id)}
                      className="flex-1 bg-red-500 py-3 rounded-2xl font-bold"
                    >
                      Delete
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* BANK */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Saved Bank Cards
        </h2>

        <div className="mt-5 space-y-4">

          {bankList.map((b)=>(

            <div
              key={b.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-5"
            >

              {editBankId === b.id ? (

                <>

                  <input
                    value={editHolder}
                    onChange={(e)=>
                      setEditHolder(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324]"
                  />

                  <input
                    value={editAccount}
                    onChange={(e)=>
                      setEditAccount(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324] mt-3"
                  />

                  <input
                    value={editIfsc}
                    onChange={(e)=>
                      setEditIfsc(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324] mt-3"
                  />

                  <input
                    value={editBankName}
                    onChange={(e)=>
                      setEditBankName(e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-[#0d1324] mt-3"
                  />

                  <button
                    onClick={saveBankEdit}
                    className="mt-4 w-full bg-green-500 text-black py-3 rounded-2xl font-bold"
                  >
                    Save
                  </button>

                </>

              ) : (

                <>

                  <h2 className="font-bold text-lg">
                    {b.bankName}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {b.holder}
                  </p>

                  <p className="text-gray-400">
                    {b.account}
                  </p>

                  <p className="text-gray-400">
                    {b.ifsc}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => {

                        setEditBankId(b.id);

                        setEditHolder(b.holder);

                        setEditAccount(b.account);

                        setEditIfsc(b.ifsc);

                        setEditBankName(b.bankName);

                      }}
                      className="flex-1 bg-yellow-500 text-black py-3 rounded-2xl font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBank(b.id)}
                      className="flex-1 bg-red-500 py-3 rounded-2xl font-bold"
                    >
                      Delete
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      </div>

      <p className="text-center text-gray-500 mt-10 pb-5">
        © 2026 BharatP2P. All Rights Reserved.
      </p>

    </main>

  );

}