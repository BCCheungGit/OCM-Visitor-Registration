import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

export const metadata = {
  title: "OCM Visitors",
  description: "Created by Benjamin Cheung",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <ClerkProvider>
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="font-sans">
        <TopNav />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
