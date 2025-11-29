import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../../models/User";
import OtpCode from "../../../../../models/OtpCode";

export const authOptions = {
  providers: [
    // ---------- OTP با شماره تلفن ----------
    CredentialsProvider({
      name: "OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (!credentials.phone || !credentials.code) return null;

        const otp = await OtpCode.findOne({
          phone: credentials.phone,
          code: credentials.code,
        });
        if (!otp) return null;

        await OtpCode.deleteOne({ _id: otp._id });

        // پیدا کردن یا ساخت کاربر
        let user = await User.findOne({ phone: credentials.phone });
        if (!user) {
          user = await User.create({
            phone: credentials.phone,
            name: credentials.phone,
          });
        }

        return { id: user._id.toString(), name: user.name, phone: user.phone };
      },
    }),

    // ---------- ایمیل ----------
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),

    // ---------- گوگل ----------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // مسیر فرم ورود
    error: "/login", // نمایش خطا
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
