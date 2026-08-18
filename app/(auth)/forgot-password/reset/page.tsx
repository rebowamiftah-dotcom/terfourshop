import { redirect } from "next/navigation";

import { getResetPasswordVerify } from "@/lib/verifyResetPassword";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage() {
  const praForgotPassword = await getResetPasswordVerify();

  if (!praForgotPassword) {
    redirect("/forgot-password");
  };

  return (
    <ResetPasswordForm
      email={praForgotPassword.user.email}
    />
  );
}