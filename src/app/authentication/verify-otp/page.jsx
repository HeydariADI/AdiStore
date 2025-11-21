"use client";

import { Suspense } from "react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
