import "./globals.css";

import PwaRegister from "./pwa-register";

import { Toaster } from "react-hot-toast";

export const metadata = {

  title: "BharatP2P",

  description:
    "Premium Crypto P2P Platform",

  manifest:
    "/manifest.json",

  icons: {

    apple:
      "/icon-192.png",

    icon:
      "/icon-192.png"

  }

};

export const viewport = {

  themeColor:
    "#050816"

};

export default function RootLayout({
  children
}) {

  return (

    <html lang="en">

      <body>

        <PwaRegister />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#0d1324",
              color: "#fff",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              fontWeight: "700",
              padding: "14px 18px"
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#000"
              }
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff"
              }
            }
          }}
        />

        {children}

      </body>

    </html>

  );

}
