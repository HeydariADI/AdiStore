import React from "react";

function page() {
  return (
    <div className="cartpage flex p-5 mt-4  justify-between items-center">
      <div className="w-2/3 p-4 m-1">
        <div className="flex justify-around items-center   ">
          <div className="flex justify-center items-center gap-4 ">
            <h1 className="text-3xl font-bold">سبد خرید شما</h1>
            <span className="text-xl font-medium">2 عدد کالا</span>
          </div>
          <div className="">
            <p className="text-xl hover:text-orange-600">حذف کل سبد خرید ❌ </p>
          </div>
        </div>
        <div className=" cartproduct flex flex-col justify-center  items-center mt-5 p-10 border border-gray-300 rounded-2xl shadow ">
          <div className="flex justify-between items-center w-full">
            <div className="cartproduct_info   ">
              <h1 className="text-2xl font-bold  p-4">
                هدفون بلوتوثی کیو سی وای مدل T13 ANC 2
              </h1>
              <ul className="flex flex-col p-5 text-lg gap-5">
                <li>🔯 6 ماه گارانتی شرکتی</li>
                <li>✔ موجود در انبار </li>
              </ul>
            </div>
            <div className="cartproduct_image w-80 h-80 mt-5 p-4 flex justify-center items-center">
              <img
                src="/images/headphone/headphone6.jpg"
                alt=""
                className="w-60 h-60 "
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full m-4 p-4 border border-gray-100 shadow rounded-xl ">
            <div className=" flex items-center gap-2 font-bold text-xl w-40 h-12 p-5 border border-gray-400 rounded-sm m-5">
              <p className="bg-black p-2 border  w-5 h-5"></p>
              <p>مشکی</p>
            </div>
            <div className=" flex  justify-between w-2/3 items-center  p-5 m-5">
              <p>1,546,800 ریال</p>
              <div className="flex justify-between items-center w-1/2">
                <button className="border border-gray-200 shadow p-2 w-10 h-10 ">
                  ➕
                </button>
                <p className="text-xl">1</p>

                <button className="border border-gray-200 shadow p-2 w-10 h-10">
                  ➖
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-10 mb-10  ">
        <div className="">
          <h1 className="text-3xl font-bold m-10">صورتحساب</h1>
        </div>
        <div className="border border-gray-200 shadow w-full  p-10 flex flex-col gap-10 text-xl">
          <div className="flex justify-between items-center">
            <p>قیمت محصول</p>
            <p>7,803,000 ریال</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold"> جمع کل</p>
            <p>7,803,000 ریال</p>
          </div>
          <button className="bg-orange-500 p-6 rounded-xl text-white text-2xl font-medi ">
            ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
