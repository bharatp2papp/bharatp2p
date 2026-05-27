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

export default function BuyListingsPage() {

  const [sellerName, setSellerName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [min, setMin] =
    useState("");

  const [max, setMax] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [upiEnabled, setUpiEnabled] =
    useState(false);

  const [bankEnabled, setBankEnabled] =
    useState(false);

  const [upi, setUpi] =
    useState("");

  const [bankName, setBankName] =
    useState("");

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [ifsc, setIfsc] =
    useState("");

  const [listings, setListings] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  useEffect(() => {

    const buyRef =
      ref(db, "buyListings");

    onValue(buyRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        const arr =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setListings(arr.reverse());

      } else {

        setListings([]);

      }

    });

  }, []);

  const clearForm = () => {

    setSellerName("");
    setPrice("");
    setMin("");
    setMax("");
    setSuccess("");

    setUpiEnabled(false);
    setBankEnabled(false);

    setUpi("");

    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setIfsc("");

    setEditId(null);

  };

  const saveListing =
    async () => {

    if (
      !sellerName ||
      !price
    ) {

      alert(
        "Fill required fields"
      );

      return;

    }

    try {

      const payload = {

        sellerName,
        price,
        min,
        max,
        success,

        upiEnabled,
        bankEnabled,

        upi,

        bankName,
        accountName,
        accountNumber,
        ifsc,

        updatedAt:
          Date.now()
      };

      if (editId) {

        await update(

          ref(
            db,
            `buyListings/${editId}`
          ),

          payload

        );

        alert(
          "Listing Updated"
        );

      } else {

        await push(

          ref(
            db,
            "buyListings"
          ),

          payload

        );

        alert(
          "Listing Added"
        );

      }

      clearForm();

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    }

  };

  const deleteListing =
    async (id) => {

    const confirmDelete =
      confirm(
        "Delete this listing?"
      );

    if (!confirmDelete)
      return;

    try {

      await remove(
        ref(
          db,
          `buyListings/${id}`
        )
      );

      alert(
        "Listing Deleted"
      );

    } catch (err) {

      console.log(err);

    }

  };

  const editListing =
    (item) => {

    setEditId(item.id);

    setSellerName(
      item.sellerName || ""
    );

    setPrice(
      item.price || ""
    );

    setMin(
      item.min || ""
    );

    setMax(
      item.max || ""
    );

    setSuccess(
      item.success || ""
    );

    setUpiEnabled(
      item.upiEnabled || false
    );

    setBankEnabled(
      item.bankEnabled || false
    );

    setUpi(
      item.upi || ""
    );

    setBankName(
      item.bankName || ""
    );

    setAccountName(
      item.accountName || ""
    );

    setAccountNumber(
      item.accountNumber || ""
    );

    setIfsc(
      item.ifsc || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

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

            Buy Listings

          </h1>

        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6 space-y-4">

          <input
            type="text"
            placeholder="Seller Name"
            value={sellerName}
            onChange={(e)=>
              setSellerName(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e)=>
              setPrice(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="number"
            placeholder="Minimum Limit"
            value={min}
            onChange={(e)=>
              setMin(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="number"
            placeholder="Maximum Limit"
            value={max}
            onChange={(e)=>
              setMax(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="Success Rate"
            value={success}
            onChange={(e)=>
              setSuccess(
                e.target.value
              )
            }
            className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
          />

          <div className="bg-[#0d1324] rounded-3xl p-5">

            <h2 className="text-xl font-bold">

              Payment Methods

            </h2>

            <div className="mt-4 space-y-3">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={upiEnabled}
                  onChange={() =>
                    setUpiEnabled(
                      !upiEnabled
                    )
                  }
                />

                UPI

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={bankEnabled}
                  onChange={() =>
                    setBankEnabled(
                      !bankEnabled
                    )
                  }
                />

                Bank / IMPS

              </label>

            </div>

          </div>

          {upiEnabled && (

            <input
              type="text"
              placeholder="UPI ID"
              value={upi}
              onChange={(e)=>
                setUpi(
                  e.target.value
                )
              }
              className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
            />

          )}

          {bankEnabled && (

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e)=>
                  setBankName(
                    e.target.value
                  )
                }
                className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
              />

              <input
                type="text"
                placeholder="Account Holder Name"
                value={accountName}
                onChange={(e)=>
                  setAccountName(
                    e.target.value
                  )
                }
                className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
              />

              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e)=>
                  setAccountNumber(
                    e.target.value
                  )
                }
                className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
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
                className="w-full bg-[#0d1324] p-5 rounded-3xl outline-none"
              />

            </div>

          )}

          <button
            onClick={saveListing}
            className="w-full bg-green-500 text-black py-5 rounded-3xl font-bold text-lg"
          >

            {editId
              ? "Update Listing"
              : "Add Buy Listing"}

          </button>

        </div>

        <div className="mt-8 space-y-5">

          {listings.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-5"
            >

              <div className="flex items-center justify-between gap-3">

                <div>

                  <h2 className="text-2xl font-black">

                    {item.sellerName}

                  </h2>

                  <p className="text-green-400 mt-2">

                    ₹{item.price} / USDT

                  </p>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      editListing(item)
                    }
                    className="bg-blue-500 px-4 py-2 rounded-2xl font-bold"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      deleteListing(
                        item.id
                      )
                    }
                    className="bg-red-500 px-4 py-2 rounded-2xl font-bold"
                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}