import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb"; // مسیر یکسان
import otpCode from "@/models/otpCode"; // مسیر و نام یکسان

export async function POST(req) {
  try {
    await connectToDatabase();

    const { phone, enteredCode } = await req.json();

    if (!phone || !enteredCode)
      return NextResponse.json(
        { error: "شماره و کد الزامی هستند" },
        { status: 400 }
      );

    const storedOtp = await otpCode.findOne({ phone, code: enteredCode });

    if (storedOtp) {
      await otpCode.deleteOne({ _id: storedOtp._id });
      return NextResponse.json({ message: "تأیید موفقیت‌آمیز" });
    } else {
      return NextResponse.json(
        { error: "کد نامعتبر یا منقضی شده است" },
        { status: 401 }
      );
    }
  } catch (e) {
    console.error("خطا در تأیید OTP:", e);
    return NextResponse.json(
      { error: "خطای سرور در هنگام تأیید کد" },
      { status: 500 }
    );
  }
}
