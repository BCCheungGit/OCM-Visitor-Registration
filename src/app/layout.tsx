import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { zhCN, zhTW } from "@clerk/localizations";

export const metadata = {
  title: "OCM Visitors",
  description: "Created by Benjamin Cheung",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const localization = {
  signUp: {
    continue: {
      actionLink: 'blah',
      actionText: 'blablah',
      subtitle: 'Please fill in the remaining details to continue.',
      title: 'Fill in missing fields',
    },
    start: {
      actionLink: 'blah blah',
      actionText: 'Benjamin Cheung',
      subtitle: 'Welcome! Please fill in the details to get started.',
      title: 'Create your account',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={zhCN}>
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="font-sans">
        <TopNav />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
