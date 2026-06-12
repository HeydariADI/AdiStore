import { NextResponse } from "next/server";
import Kavenegar from "kavenegar";
import { connectToDatabase } from "@lib/mongodb";
import OtpCode from "@models/OtpCode";

const api = Kavenegar.KavenegarApi({ apikey: process.env.KAVENEGAR_API_KEY });

export async function POST(req) {
  try {
    await connectToDatabase();
    let { phone } = await req.json();
    if (!phone)
      return NextResponse.json({ error: "شماره الزامی است" }, { status: 400 });

    phone = phone.trim().replace(/\D/g, "");
    if (phone.startsWith("0")) phone = "+98" + phone.slice(1);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpCode.deleteMany({ phone });
    await OtpCode.create({ phone, code });

    await new Promise((resolve, reject) => {
      api.Send(
        {
          message: `کد ورود شما: ${code}`,
          sender: "0018018949161",
          receptor: phone,
        },
        (response, status) => {
          console.log("📩 Kavenegar response:", response, "status:", status);
          if (status === 200 && response?.return?.status === 200)
            resolve(response);
          else {
            const errorMsg = response
              ? JSON.stringify(response)
              : `خطای Kavenegar با status ${status}`;
            reject(new Error(errorMsg));
          }
        }
      );
    });

    return NextResponse.json({
      success: true,
      message: "کد با موفقیت ارسال شد ✅",
    });
  } catch (e) {
    console.error("⚠️ خطا در ارسال کد:", e);
    return NextResponse.json(
      { error: `خطا در ارسال کد: ${e.message || e}` },
      { status: 500 }
    );
  }
}
