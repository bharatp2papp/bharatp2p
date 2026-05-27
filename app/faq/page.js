"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

const faqs = [

  {
    question: "How long does deposit take?",
    answer:
      "Deposits are usually verified within 15 minutes after transaction submission."
  },

  {
    question: "When will I receive USDT after payment?",
    answer:
      "USDT is released after seller confirms successful payment."
  },

  {
    question: "Can I cancel my order?",
    answer:
      "Yes, orders can be cancelled before payment confirmation."
  },

  {
    question: "What payment methods are supported?",
    answer:
      "UPI, Bank Transfer, IMPS and NEFT are supported."
  },

  {
    question: "What if payment is deducted but order is pending?",
    answer:
      "Contact support with your transaction details for quick assistance."
  },

  {
    question: "Is BharatP2P secure?",
    answer:
      "Yes, BharatP2P uses secure P2P escrow style transactions for safer trading."
  }

];

export default function FAQPage() {

  const [loading, setLoading] =
    useState(true);

  const [openIndex, setOpenIndex] =
    useState(null);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 900);

    return () =>
      clearTimeout(timer);

  }, []);

  if (loading) {

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

      {/* GLOW */}

      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-80px] right-[-80px] w-[180px] h-[180px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="max-w-sm mx-auto relative z-10">

        {/* TOP */}

        <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <Link href="/dashboard">

              <button className="text-2xl text-green-400">

                ←

              </button>

            </Link>

            <div className="w-14 h-14 rounded-full bg-[#020617] border border-green-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.20)]">

              <span className="text-green-400 text-xl font-black tracking-[-2px]">

                BP

              </span>

              <span className="text-yellow-300 text-xl font-black -ml-1">

                ⚡

              </span>

            </div>

            <div className="w-8" />

          </div>

          <h1 className="text-3xl font-black text-center mt-5">

            FAQ

          </h1>

          <p className="text-center text-gray-400 mt-2 text-sm leading-6">

            Frequently asked questions and quick answers.

          </p>

        </div>

        {/* FAQ LIST */}

        <div className="mt-4 space-y-3">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[24px] overflow-hidden backdrop-blur-xl"
            >

              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index
                    ? null
                    : index
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left"
              >

                <h2 className="text-sm font-black pr-3 leading-6">

                  {faq.question}

                </h2>

                <span className="text-green-400 text-xl font-black">

                  {openIndex === index
                    ? "−"
                    : "+"}

                </span>

              </button>

              {openIndex === index && (

                <div className="px-4 pb-4">

                  <div className="h-[1px] bg-white/10 mb-4" />

                  <p className="text-gray-400 text-sm leading-7">

                    {faq.answer}

                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

        {/* EXTRA CARD */}

        <div className="mt-4 bg-white/5 border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">

          <h2 className="text-lg font-black">

            Need More Help?

          </h2>

          <p className="text-gray-400 text-sm leading-7 mt-3">

            If your issue is not listed here, contact BharatP2P support team for quick assistance regarding deposits, trades, withdrawals and payment issues.

          </p>

          <Link href="/support">

            <button className="w-full mt-4 bg-gradient-to-r from-green-400 to-green-600 text-black py-4 rounded-[22px] font-black text-sm shadow-xl shadow-green-500/20">

              Contact Support

            </button>

          </Link>

        </div>

        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-6 pb-4 text-sm">

          © 2026 BharatP2P. All Rights Reserved.

        </p>

      </div>

    </main>

  );

}