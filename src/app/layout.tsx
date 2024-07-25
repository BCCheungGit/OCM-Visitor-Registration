import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { zhTW } from "@clerk/localizations";
import { frFR } from "@clerk/localizations";
export const metadata = {
  title: "OCM Visitors",
  description: "Created by Benjamin Cheung",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


const localization = {
  signUp: {
    start: {
      title: "登记",

    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="font-sans">
        <TopNav />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
