import { z } from "zod";

// REGISTRASI
export const registrasiSchema = z
  .object({
    email: z
      .email({ message: "Format alamat email tidak valid" })
      .max(255, { message: "Email terlalu panjang."}),
    password: z
      .string({ message: "Kata sandi wajib diisi" })
      .min(8, { message: "Kata sandi minimal 8 karakter" })
      .max(255, { message: "Kata sandi terlalu panjang."}),
    confirmPassword: z
      .string({ message: "Konfirmasi kata sandi wajib diisi" })
      .min(8, { message: "Konfirmasi kata sandi minimal 8 karakter" })
      .max(255, { message: "Konfirmasi kata terlalu panjang."}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],   // Pesan error akan muncul di field confirmPassword
  });

// LOGIN
export const loginSchema = z.object({
  identity: z
    .string()
    .min(5, { message: "Email atau Username wajib diisi." })
    .max(50, { message: "Email atau Username terlalu panjang."}),
  password: z
    .string()
    .min(8, { message: "Kata sandi wajib diisi." })
    .max(255, { message: "Kata terlalu panjang."}),
});

// FORGOT PASSWORD
export const forgotPasswordSchema =
  z.object({
    email: z
      .email({ message: "Format alamat email tidak valid" })
      .max(255, "Email terlalu panjang."),
  });

// RESET PASSWORD

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password wajib diisi." })
      .min(8, { message: "Password minimal 8 karakter." })
      .max(255, { message: "Password terlalu panjang." }),

    confirmPassword: z
      .string({ message: "Konfirmasi password wajib diisi." })
      .min(8, { message: "Konfirmasi password minimal 8 karakter." })
      .max(255, { message: "Konfirmasi password terlalu panjang." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

// Verifikasi OTP
export const verifyOTPSchema = z.object({
  otp: z
    .string({ message: "Kode OTP wajib diisi." })
    .min(6, { message: "Kode OTP wajib diisi." })
    .regex(/^\d{6}$/, { message: "Kode OTP harus berupa 6 digit angka." }),
});

// Type inference untuk TypeScript
export type RegistrasiFormValues = z.infer<typeof registrasiSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;  
export type ForgotPasswordFormValues = z.infer< typeof forgotPasswordSchema >;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;