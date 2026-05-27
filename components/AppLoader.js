"use client";

export default function AppLoader() {

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