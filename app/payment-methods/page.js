"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  ref,
  push,
  onValue,
  remove,
  update
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function PaymentMethodsPage() {

  const [bankName, setBankName] =
    useState("");

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [ifsc, setIfsc] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  const [bankCards, setBankCards] =
    useState([]);

  const [upiCards, setUpiCards] =
    useState([]);

  const [showCards, setShowCards] =
    useState(false);

  const [editBankId, setEditBankId] =
    useState(null);

  const [editUpiId, setEditUpiId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageColor, setMessageColor] =
    useState("green");

  const showMessage =
    (
      text,
      color = "green"
    ) => {

      setMessage(text);

      setMessageColor(color);

      setTimeout(() => {

        setMessage("");

      }, 2500);

    };

  useEffect(() => {

    const bankRef =
      ref(db, "bank-methods");

    const upiRef =
      ref(db, "upi-methods");

    onValue(bankRef, (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loaded =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setBankCards(
          loaded.reverse()
        );

      } else {

        setBankCards([]);

      }

      setLoading(false);

    });

    onValue(upiRef, (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loaded =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setUpiCards(
          loaded.reverse()
        );

      } else {

        setUpiCards([]);

      }

    });

  }, []);

  const saveBank =
    async () => {

      if (
        !bankName ||
        !accountName ||
        !accountNumber ||
        !ifsc
      ) {

        showMessage(
          "Fill bank details",
          "red"
        );

        return;

      }

      try {

        setActionLoading(true);

        if (editBankId) {

          await update(
            ref(
              db,
              `bank-methods/${editBankId}`
            ),
            {
              bankName,
              accountName,
              accountNumber,
              ifsc
            }
          );

          showMessage(
            "Bank updated successfully"
          );

          setEditBankId(null);

        } else {

          await push(
            ref(
              db,
              "bank-methods"
            ),
            {
              bankName,
              accountName,
              accountNumber,
              ifsc
            }
          );

          showMessage(
            "Bank saved successfully"
          );

        }

        setBankName("");
        setAccountName("");
        setAccountNumber("");
        setIfsc("");

      } catch (err) {

        console.log(err);

        showMessage(
          "Something went wrong",
          "red"
        );

      } finally {

        setActionLoading(false);

      }

    };

  const saveUpi =
    async () => {

      if (!upiId) {

        showMessage(
          "Enter UPI ID",
          "red"
        );

        return;

      }

      try {

        setActionLoading(true);

        if (editUpiId) {

          await update(
            ref(
              db,
              `upi-methods/${editUpiId}`
            ),
            {
              upiId
            }
          );

          showMessage(
            "UPI updated successfully"
          );

          setEditUpiId(null);

        } else {

          await push(
            ref(
              db,
              "upi-methods"
            ),
            {
              upiId
            }
          );

          showMessage(
            "UPI saved successfully"
          );

        }

        setUpiId("");

      } catch (err) {

        console.log(err);

        showMessage(
          "Something went wrong",
          "red"
        );

      } finally {

        setActionLoading(false);

      }

    };

  const deleteBank =
    async (id) => {

      try {

        setActionLoading(true);

        await remove(
          ref(
            db,
            `bank-methods/${id}`
          )
        );

        showMessage(
          "Bank deleted"
        );

      } finally {

        setActionLoading(false);

      }

    };

  const deleteUpi =
    async (id) => {

      try {

        setActionLoading(true);

        await remove(
          ref(
            db,
            `upi-methods/${id}`
          )
        );

        showMessage(
          "UPI deleted"
        );

      } finally {

        setActionLoading(false);

      }

    };

  const editBank =
    (card) => {

      setEditBankId(card.id);

      setBankName(card.bankName);

      setAccountName(card.accountName);

      setAccountNumber(card.accountNumber);

      setIfsc(card.ifsc);

      setShowCards(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  const editUpi =
    (card) => {

      setEditUpiId(card.id);

      setUpiId(card.upiId);

      setShowCards(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  if (
    loading ||
    actionLoading
  ) {

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

      <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl relative z-10">

        <Link href="/dashboard">

          <button className="text-green-400 text-2xl mb-4">

            ← Back

          </button>

        </Link>

        <div className="flex flex-col items-center text-center">

          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_35px_rgba(34,197,94,0.20)]">

            <div className="w-14 h-14 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center">

              <span className="text-green-400 text-2xl font-black tracking-[-2px]">

                BP

              </span>

              <span className="text-yellow-300 text-2xl font-black -ml-1">

                ⚡

              </span>

            </div>

          </div>

          <h1 className="text-3xl font-black mt-4">

            Payment Methods

          </h1>

          <p className="text-gray-400 mt-2 text-sm">

            Manage payment accounts

          </p>

        </div>

        {message && (

          <div className={`mt-5 p-3 rounded-2xl text-center font-bold border text-sm ${
            messageColor === "red"
            ? "bg-red-500/10 border-red-500/20 text-red-400"
            : "bg-green-500/10 border-green-500/20 text-green-400"
          }`}>

            {message}

          </div>

        )}

        <button
          onClick={() =>
            setShowCards(true)
          }
          className="w-full mt-6 bg-white/5 border border-white/10 py-4 rounded-[24px] font-black text-base"
        >

          Saved Cards

        </button>

        {/* BANK */}

        <div className="mt-6">

          <h2 className="text-xl font-black mb-3">

            Bank Account

          </h2>

          <div className="space-y-3">

            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e)=>
                setBankName(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[22px] bg-[#0d1324] outline-none border border-white/5 text-sm"
            />

            <input
              type="text"
              placeholder="Account Holder"
              value={accountName}
              onChange={(e)=>
                setAccountName(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[22px] bg-[#0d1324] outline-none border border-white/5 text-sm"
            />

            <input
              type="number"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e)=>
                setAccountNumber(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[22px] bg-[#0d1324] outline-none border border-white/5 text-sm"
            />

            <input
              type="text"
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e)=>
                setIfsc(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-[22px] bg-[#0d1324] outline-none border border-white/5 text-sm"
            />

            <button
              onClick={saveBank}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm"
            >

              {editBankId
                ? "Update Bank"
                : "Save Bank"}

            </button>

          </div>

        </div>

        {/* UPI */}

        <div className="mt-6">

          <h2 className="text-xl font-black mb-3">

            UPI Method

          </h2>

          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e)=>
              setUpiId(
                e.target.value
              )
            }
            className="w-full p-4 rounded-[22px] bg-[#0d1324] outline-none border border-white/5 text-sm"
          />

          <button
            onClick={saveUpi}
            className="w-full mt-3 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm"
          >

            {editUpiId
              ? "Update UPI"
              : "Save UPI"}

          </button>

        </div>

      </div>

      {/* MODAL */}

      {showCards && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">

          <div className="w-full max-w-sm bg-[#08111f] border border-white/10 rounded-[28px] p-5 max-h-[85vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-black">

                Saved Cards

              </h2>

              <button
                onClick={() =>
                  setShowCards(false)
                }
                className="text-2xl text-red-400"
              >

                ✕

              </button>

            </div>

            {/* BANKS */}

            <div>

              <h3 className="text-lg font-black mb-3">

                Saved Banks

              </h3>

              <div className="space-y-3">

                {bankCards.map((card) => (

                  <div
                    key={card.id}
                    className="bg-white/5 border border-white/10 rounded-[22px] p-4"
                  >

                    <h4 className="font-black text-base">

                      {card.bankName}

                    </h4>

                    <p className="text-gray-400 text-sm mt-1">

                      {card.accountName}

                    </p>

                    <p className="text-gray-400 text-sm break-all">

                      {card.accountNumber}

                    </p>

                    <p className="text-green-400 text-sm mt-1">

                      {card.ifsc}

                    </p>

                    <div className="flex gap-2 mt-4">

                      <button
                        onClick={() =>
                          editBank(card)
                        }
                        className="flex-1 bg-blue-500 py-3 rounded-[18px] font-black text-sm"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteBank(card.id)
                        }
                        className="flex-1 bg-red-500 py-3 rounded-[18px] font-black text-sm"
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* UPI */}

            <div className="mt-6">

              <h3 className="text-lg font-black mb-3">

                Saved UPI

              </h3>

              <div className="space-y-3">

                {upiCards.map((card) => (

                  <div
                    key={card.id}
                    className="bg-white/5 border border-white/10 rounded-[22px] p-4"
                  >

                    <h4 className="font-black text-green-400 break-all text-sm">

                      {card.upiId}

                    </h4>

                    <div className="flex gap-2 mt-4">

                      <button
                        onClick={() =>
                          editUpi(card)
                        }
                        className="flex-1 bg-blue-500 py-3 rounded-[18px] font-black text-sm"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteUpi(card.id)
                        }
                        className="flex-1 bg-red-500 py-3 rounded-[18px] font-black text-sm"
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}