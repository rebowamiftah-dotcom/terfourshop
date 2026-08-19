import { redirect } from "next/navigation";

import { getForgotPasswordVerify } from "@/lib/verifyForgotPassword";
import VerifikasiForm from "./VerifikasiForm";

export default async function VerifikasiPage() {
  const praForgotPassword = await getForgotPasswordVerify();

  if (!praForgotPassword) {
    redirect("/forgot-password");
  };

  const otpExpiresAt = praForgotPassword.expires_at.getTime();

  const resendAvailableAt = praForgotPassword.last_otp_sent_at
    ? praForgotPassword.last_otp_sent_at.getTime() + 60 * 1000
    : null;

  return (
    <VerifikasiForm
      email={praForgotPassword.user.email}
      otpExpiresAt={otpExpiresAt}
      resendAvailableAt={resendAvailableAt}
    />
  );
}