import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="bg-gray-50  flex justify-center items-center ">
      <div className="vallet_card w-1/3 flex flex-col justify-center items-center rounded-2xl border border-gray-300 mt-20 p-10 bg-gray-100 shadow-xl ">
        <h2 className="p-5 text-2xl text-orange-500 ">افزایش موجودی کیف پول</h2>
        <div className="mt-10 p-10 flex flex-col justify-center items-center ">
          <h3 className="text-xl leading-10">
            شما در حال افزایش موجودی کیف پول حساب کاربری{" "}
            <span className="text-orange-300">09121234567</span> هستید.
          </h3>

          <div className="vallet_charge mt-20 p-10  w-full">
            <h4 className="p-5">مبلغ خود را به ریال وارد کنید</h4>
            <input
              type="text"
              placeholder="500000 ریال"
              className="border border-orange-300 rounded-2xl p-5 w-full  focus:bg-amber-50  "
            />
          </div>

          <div className="bank mt-20 ">
            <h5 className="text-2xl">انتخاب درگاه پرداخت:</h5>
            <ul className="flex flex-col gap-5 mt-10">
              <Link href="#" className="hover:text-blue-400">
                <li>پرداخت آنلاین ( درگاه بانک ملی ) </li>
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <li>پرداخت آنلاین ( پرداخت نوین )</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
