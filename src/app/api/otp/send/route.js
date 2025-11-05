import { NextResponse } from "next/server";
import Kavenegar from "kavenegar";
import otpCode from "../../../../../models/OtpCode";
import connectToDatabase from "../../../../lib/mongodb";

const api = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API_KEY,
});

export async function POST(req) {
  try {
    await connectToDatabase();

    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json({ error: "شماره الزامی است" }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await otpCode.deleteMany({ phone });
    await otpCode.create({ phone, code });

    await new Promise((resolve, reject) => {
      api.Send(
        {
          message: `کد ورود شما: ${code}`,
          sender: "0018018949161",
          receptor: phone,
        },
        (response, status) => {
          if (status === 200) resolve(response);
          else reject(new Error("خطا در ارسال پیامک"));
        }
      );
    });

    return NextResponse.json({
      success: true,
      message: "کد با موفقیت ارسال شد ✅",
    });
  } catch (e) {
    console.error("خطا در ارسال کد:", e);
    return NextResponse.json(
      { error: "خطا در ارسال کد، لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
