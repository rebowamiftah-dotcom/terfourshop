import { redirect } from "next/navigation";

import { getLoginVerify } from "@/lib/verifyLogin";
import VerifikasiForm from "./VerifikasiForm";

export default async function VerifikasiPage() {
  const praLogin = await getLoginVerify();

  if (!praLogin) {
    redirect("/login");
  };

  // Waktu OTP Berakhir
  const otpExpiresAt = praLogin.expires_at.getTime();

  // Waktu Cooldown Resend OTP
  const resendAvailableAt = praLogin.last_otp_sent_at
    ? praLogin.last_otp_sent_at.getTime() + 60 * 1000
    : null;

  return (
    <VerifikasiForm
      otpExpiresAt={otpExpiresAt}
      resendAvailableAt={resendAvailableAt}
    />
  );
}