"use client";

import {
  useEffect,
  useRef,
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
  update,
  push,
  onValue
} from "firebase/database";

import { db } from "@/lib/firebase";

export default function BuyOrderLivePage() {

  const params =
    useParams();

  const router =
    useRouter();

  const messagesEndRef =
    useRef(null);

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [timeLeft, setTimeLeft] =
    useState("");

  const [chatOpen, setChatOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const user =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "bharatp2pUser"
        )
      : "";

  useEffect(() => {

    loadOrder();

  }, []);

  useEffect(() => {

    if (!params.id)
      return;

    const chatRef =
      ref(
        db,
        `chats/${params.id}`
      );

    onValue(chatRef, (snapshot) => {

      if (snapshot.exists()) {

        const data =
          snapshot.val();

        const arr =
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));

        setMessages(arr);

      } else {

        setMessages([]);

      }

    });

  }, [params.id]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  useEffect(() => {

    if (
      !order ||
      order.status === "Cancelled" ||
      order.status === "Paid" ||
      order.status === "Completed"
    ) {

      return;

    }

    const timer =
      setInterval(() => {

        const total =
          15 * 60 * 1000;

        const distance =
          total -
          (
            Date.now() -
            order.paymentTime
          );

        if (distance <= 0) {

          setTimeLeft(
            "Expired"
          );

          clearInterval(timer);

          autoCancelOrder();

          return;

        }

        const minutes =
          Math.floor(
            (
              distance %
              (
                1000 * 60 * 60
              )
            ) /
            (
              1000 * 60
            )
          );

        const seconds =
          Math.floor(
            (
              distance %
              (
                1000 * 60
              )
            ) / 1000
          );

        setTimeLeft(
          `${minutes}m ${seconds}s`
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [order]);

  const loadOrder =
    async () => {

    try {

      const snapshot =
        await get(
          ref(
            db,
            `orders/${params.id}`
          )
        );

      if (snapshot.exists()) {

        setOrder(
          snapshot.val()
        );

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const sendMessage =
    async () => {

    if (
      !message.trim() ||
      order.status === "Cancelled" ||
      order.status === "Completed"
    ) {

      return;

    }

    try {

      await push(
        ref(
          db,
          `chats/${params.id}`
        ),
        {
          sender: user,
          text: message,
          createdAt:
            Date.now()
        }
      );

      setMessage("");

    } catch (err) {

      console.log(err);

    }

  };

  const autoCancelOrder =
    async () => {

    await update(
      ref(
        db,
        `orders/${params.id}`
      ),
      {
        status:
          "Cancelled"
      }
    );

    router.push("/buy");

  };

  const markPaid =
    async () => {

    await update(
      ref(
        db,
        `orders/${params.id}`
      ),
      {
        status: "Paid"
      }
    );

    setOrder({
      ...order,
      status: "Paid"
    });

  };

  const cancelOrder =
    async () => {

    await update(
      ref(
        db,
        `orders/${params.id}`
      ),
      {
        status:
          "Cancelled"
      }
    );

    router.push("/buy");

  };

  if (
    loading ||
    !order
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

  return (

    <main className="min-h-screen bg-[#050816] text-white p-5 pb-32">

      <div className="flex items-center gap-4">

        <Link href="/orders">

          <button className="text-3xl text-green-400">

            ←

          </button>

        </Link>

        <h1 className="text-3xl font-black">

          Live Order

        </h1>

      </div>

      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-[35px] p-6 text-center">

        <p className="text-gray-400">

          Payment Time Left

        </p>

        <h2 className={`text-5xl font-black mt-3 ${
          order.status === "Paid"
          ? "text-green-400"
          : order.status === "Cancelled"
          ? "text-red-400"
          : "text-yellow-400"
        }`}>

          {order.status === "Paid"
            ? "PAYMENT SENT"
            : order.status === "Cancelled"
            ? "ORDER CANCELLED"
            : timeLeft}

        </h2>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-gray-400">

              Status

            </p>

            <h2 className={`text-3xl font-black mt-2 ${
              order.status === "Cancelled"
              ? "text-red-400"
              : order.status === "Paid"
              ? "text-green-400"
              : "text-yellow-400"
            }`}>

              {order.status}

            </h2>

          </div>

          <div className="text-right">

            <p className="text-gray-400">

              USDT

            </p>

            <h2 className="text-3xl font-black text-green-400 mt-2">

              {order.usdt}

            </h2>

          </div>

        </div>

      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-6">

        <h2 className="text-2xl font-black">

          Payment Details

        </h2>

        <div className="mt-6 space-y-4">

          {order.upiEnabled && (

            <div className="bg-[#131c31] rounded-2xl p-4">

              <p className="text-gray-400">

                UPI ID

              </p>

              <h2 className="font-bold mt-2 break-all">

                {order.upi}

              </h2>

            </div>

          )}

          {order.bankEnabled && (

            <div className="bg-[#131c31] rounded-2xl p-4 space-y-4">

              <div>

                <p className="text-gray-400">

                  Bank Name

                </p>

                <h2 className="font-bold mt-2">

                  {order.bankName}

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  Account Holder

                </p>

                <h2 className="font-bold mt-2">

                  {order.accountName}

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  Account Number

                </p>

                <h2 className="font-bold mt-2 break-all">

                  {order.accountNumber}

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  IFSC

                </p>

                <h2 className="font-bold mt-2">

                  {order.ifsc}

                </h2>

              </div>

            </div>

          )}

        </div>

      </div>

      {order.status === "Pending" && (

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={cancelOrder}
            className="bg-red-500 text-white py-5 rounded-2xl font-black text-lg"
          >

            Cancel

          </button>

          <button
            onClick={markPaid}
            className="bg-green-500 text-black py-5 rounded-2xl font-black text-lg"
          >

            Mark Paid

          </button>

        </div>

      )}

      {order.status === "Paid" && (

        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-[35px] p-6 text-center">

          <h2 className="text-3xl font-black text-green-400">

            Payment Submitted

          </h2>

          <p className="text-gray-300 mt-3 leading-7">

            Waiting for seller confirmation and USDT release.

          </p>

        </div>

      )}

      {/* CHAT BUTTON */}

      <button
        onClick={() =>
          setChatOpen(true)
        }
        className="fixed bottom-8 right-6 w-16 h-16 rounded-full bg-green-500 text-black text-3xl shadow-2xl shadow-green-500/30 z-40"
      >

        💬

      </button>

      {/* CHAT BOX */}

      {chatOpen && (

        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">

          <div className="w-full h-[85vh] bg-[#0b1020] rounded-t-[35px] p-5 flex flex-col">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-black">

                Order Chat

              </h2>

              <button
                onClick={() =>
                  setChatOpen(false)
                }
                className="text-3xl"
              >

                ×

              </button>

            </div>

            <div className="flex-1 overflow-y-auto mt-6 space-y-4 pr-1">

              {messages.length > 0 ? (

                messages.map((msg) => (

                  <div
                    key={msg.id}
                    className={`max-w-[80%] p-4 rounded-3xl ${
                      msg.sender === user
                      ? "ml-auto bg-green-500 text-black"
                      : "bg-[#131c31] text-white"
                    }`}
                  >

                    <p className="break-words">

                      {msg.text}

                    </p>

                    <p className={`text-xs mt-2 ${
                      msg.sender === user
                      ? "text-black/70"
                      : "text-gray-400"
                    }`}>

                      {new Date(
                        msg.createdAt
                      ).toLocaleTimeString()}

                    </p>

                  </div>

                ))

              ) : (

                <div className="text-center text-gray-400 mt-10">

                  No Messages Yet

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>

            <div className="mt-4 flex gap-3">

              <input
                value={message}
                onChange={(e)=>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Type message..."
                disabled={
                  order.status === "Cancelled" ||
                  order.status === "Completed"
                }
                className="flex-1 bg-[#131c31] rounded-2xl px-5 outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={
                  order.status === "Cancelled" ||
                  order.status === "Completed"
                }
                className="bg-green-500 text-black px-6 rounded-2xl font-black"
              >

                Send

              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}