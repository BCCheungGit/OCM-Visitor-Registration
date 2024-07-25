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
  formFieldLabel__firstName: "First Name 名字",
  formFieldLabel__lastName: "Last Name 姓氏",
  formFieldLabel__emailAddress: "Email Address 电子邮件地址",
  formFieldHintText__optional: "Optional 选填",
  formFieldLabel__phoneNumber: 'Phone number 电话号码',
  formButtonPrimary: "Continue 继续",
  signUp: {
    start: {
      title: "Create Account 创建您的账户",
      subtitle: "继续进入中宣会",
      actionText: "Already have an account? 已经有账户了?",
      actionLink: "Sign in 登录",

    },
    phoneCode: {
      title: "Check Your Phone 检查手机短信",
      subtitle: "继续进入中宣会",
      resendButton: "Didn't receive a code? Resend 重新发送验证码"
    },
  },
  signIn: {
    start: {
      actionLink: "Sign Up 注册",
      actionText: "Don't have an Account? 还没有账户?",
      title: "Sign In 登录",
      subtitle: "继续进入中宣会",
      actionLink__use_phone: 'Use phone 使用电话',
      actionLink__use_email: 'Use email 使用电子邮件',
    },
    phoneCode: {
      title: "Check Your Phone 检查手机短信",
      subtitle: "继续进入中宣会",
      resendButton: "Didn't receive a code? Resend 重新发送验证码"
    },
  },

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
