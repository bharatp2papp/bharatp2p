import "./globals.css";

import PwaRegister from "./pwa-register";

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

        {children}

      </body>

    </html>

  );

}