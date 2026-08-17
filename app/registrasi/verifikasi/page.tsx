import { redirect } from "next/navigation";

import { getRegistrasiVerify } from "@/lib/verifyRegistrasi";
import VerifikasiForm from "./VerifikasiForm";

export default async function VerifikasiPage() {
  const praRegister = await getRegistrasiVerify();

  if (!praRegister) {
    redirect("/registrasi");
  };

  // Waktu OTP Berakhir
  const otpExpiresAt = praRegister.expires_at.getTime();

  // Waktu Cooldown Resend OTP
  const resendAvailableAt = praRegister.last_otp_sent_at
    ? praRegister.last_otp_sent_at.getTime() + 60 * 1000
    : null;

  return (
    <VerifikasiForm
      email={praRegister.email}
      otpExpiresAt={otpExpiresAt}
      resendAvailableAt={resendAvailableAt}
    />
  );
}