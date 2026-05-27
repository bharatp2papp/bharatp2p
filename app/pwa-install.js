"use client";

import {
  useEffect,
  useState
} from "react";

import {
  usePathname
} from "next/navigation";

export default function PwaInstall() {

  const pathname =
    usePathname();

  const [deferredPrompt, setDeferredPrompt] =
    useState(null);

  const [showInstall, setShowInstall] =
    useState(false);

  useEffect(() => {

    const handler = (e) => {

      e.preventDefault();

      setDeferredPrompt(e);

      setShowInstall(true);

    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );

  }, []);

  const installApp =
    async () => {

      if (!deferredPrompt) {

        return;

      }

      deferredPrompt.prompt();

      await deferredPrompt.userChoice;

      setDeferredPrompt(null);

      setShowInstall(false);

    };

  if (
    pathname !== "/" ||
    !showInstall
  ) {

    return null;

  }

  return (

    <button
      onClick={installApp}
      className="fixed top-5 right-5 z-[9999] w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-[0_0_25px_rgba(34,197,94,0.45)] flex items-center justify-center"
    >

      <span className="text-black text-xl font-black">

        ⬇

      </span>

    </button>

  );

}