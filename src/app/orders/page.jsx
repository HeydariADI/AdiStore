"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Orders() {
  const [status, setStatus] = useState("ordered");
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/orders?status=${status}`);
  //       const data = await response.json();
  //       setOrders(data);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };
  //   fetchData();
  // }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="orders flex p-5 m-5 ">
      <div className="user_info rounded-xl flex justify-between  gap-5  border  border-gray-300 w-1/3 h-screen p-10 ml-5 bg-gray-100">
        <div className="user mt-5 flex flex-col gap-20  text-xl">
          <div className="">
            <h2 className="user-name font-bold">نام کاربری</h2>
            <div className="user-number mt-2 font-light">09121234567</div>
          </div>
          <div className="vallet flex gap-20 p-2 ">
            <div className="flex gap-4 ">
              <p className="">کیف پول</p>
              <p className="">54,000 تومان</p>
            </div>
            <Link href="/vallet" className="pr-20 font-medium text-blue-500">
              افزایش موجودی
            </Link>
          </div>
        </div>
        {/* <div className="user-ediet mt-10">edit</div> */}
      </div>
      <div className="orders_detail rounded-xl w-2/3 p-5 mr-5 border  border-gray-200 bg-gray-50">
        <h2 className="font-bold m-5 text-2xl"> تاریخچه سفارشات</h2>
        <div className="orders_detail ">
          <div className="p-10 flex gap-10 text-xl font-light">
            <button
              className={`cursor-pointer focus:font-bold focus:text-orange-600 ${
                status === "ordered" ? "text-orange-600" : ""
              }`}
              onClick={() => handleStatusChange("ordered")}
            >
              جاری
            </button>
            <button
              className={`cursor-pointer focus:font-bold focus:text-orange-600 ${
                status === "delivered" ? "text-orange-600" : ""
              }`}
              onClick={() => handleStatusChange("delivered")}
            >
              تحویل داده شده
            </button>
            <button
              className={`cursor-pointer focus:font-bold  focus:text-orange-600 ${
                status === "cancel" ? "text-orange-600" : ""
              }`}
              onClick={() => handleStatusChange("cancel")}
            >
              لغو شده
            </button>
          </div>
          {status === "ordered" && (
            <div className="ordered">
              <h3 className=" text-xl mb-5 p-5"> ✅ جاری</h3>
              <div className="flex gap-8 m-8">
                <p>{new Date().toLocaleDateString("fa")}</p>
                <p>مبلغ: 6,750,001 تومان</p>
              </div>
              <div className="image w-40 h-40 flex gap-5 shadow-2xl shadow-gray-300">
                <img src="/images/headphone/headphone1.jpg" alt="image" />
                <img src="/images/mobile/mobile7.jpg" alt="image" />
              </div>
            </div>
          )}
          {status === "delivered" && (
            <div className="delivered">
              <h3 className=" text-xl mb-5 p-5"> ✅ تحویل داده شده</h3>
              <div className="flex gap-8 m-8">
                <p>{new Date().toLocaleDateString("fa")}</p>
                <p>مبلغ: 4,050,250 تومان</p>
              </div>
              <div className="image w-40 h-40 flex gap-8 p-4 m-4 shadow-2xl shadow-gray-300">
                <img
                  className="rounded-lg "
                  src="/images/laptop/10.jpg"
                  alt="image"
                />
                <img
                  className="rounded-lg"
                  src="/images/laptop/7.jpg"
                  alt="image"
                />
              </div>
            </div>
          )}

          {status === "cancel" && (
            <div className="cancel">
              <h3 className=" text-xl mb-5 p-5"> ✅ لغو شده</h3>
              <div className="flex gap-8 m-8">
                <p>{new Date().toLocaleDateString("fa")}</p>
                <p>مبلغ: 2,750,257 تومان</p>
              </div>
              <div className="image  w-40 h-40 flex gap-10 rounded-full">
                <img src="/images/game/game5.jpg" alt="image" />
                <img src="/images/mobile/4.jpg" alt="image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
