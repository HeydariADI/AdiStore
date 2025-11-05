"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone");

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!phone) {
      setError("شماره تلفن یافت نشد. لطفاً دوباره تلاش کنید.");
    }
  }, [phone]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, enteredCode: code }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ کد با موفقیت تأیید شد!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(data.error || "کد نادرست است.");
      }
    } catch (err) {
      setError("⚠️ خطا در ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center mb-4">
          تأیید شماره موبایل
        </h2>

        <p className="text-center text-gray-600 mb-3">
          کد ارسال‌شده به <strong>{phone}</strong> را وارد کنید.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="کد ۶ رقمی"
            className="border rounded w-full px-3 py-2 mb-3 text-center tracking-widest"
            disabled={isLoading}
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center mb-2">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-300"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? "در حال بررسی..." : "تأیید کد"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          کد را دریافت نکردی؟{" "}
          <button
            onClick={() => router.push("/authentication/login")}
            className="text-blue-600 underline"
          >
            بازگشت و ارسال دوباره
          </button>
        </p>
      </div>
    </div>
  );
}
