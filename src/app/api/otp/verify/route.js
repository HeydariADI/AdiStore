import { NextResponse } from "next/server";
import connectToDatabase from "@lib/mongodb";
import OtpCode from "@models/OtpCode";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { phone, enteredCode } = await req.json();

    if (!phone || !enteredCode) {
      return NextResponse.json(
        { error: "شماره و کد الزامی هستند" },
        { status: 400 }
      );
    }

    const storedOtp = await OtpCode.findOne({ phone, code: enteredCode });

    if (!storedOtp)
      return NextResponse.json(
        { error: "کد نامعتبر یا منقضی شده است" },
        { status: 401 }
      );

    await OtpCode.deleteOne({ _id: storedOtp._id });

    return NextResponse.json({
      success: true,
      message: "تأیید موفقیت‌آمیز",
    });
  } catch (e) {
    console.error("خطا در تأیید OTP:", e);
    return NextResponse.json(
      { error: "خطای سرور در هنگام تأیید کد" },
      { status: 500 }
    );
  }
}
