import { z } from "zod";

// REGISTRASI

// Registrasi
export const registrasiSchema = z
  .object({
    email: z
      .email({ message: "Format alamat email tidak valid" }),
    password: z
      .string({ message: "Kata sandi wajib diisi" })
      .min(8, { message: "Kata sandi minimal 8 karakter" }),
    confirmPassword: z
      .string({ message: "Konfirmasi kata sandi wajib diisi" })
      .min(8, { message: "Konfirmasi kata sandi minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],   // Pesan error akan muncul di field confirmPassword
  });

// Verifikasi OTP
export const verifyOTPSchema = z.object({
  email: z
    .email({ message: "Format email tidak valid." }),
  otp: z
    .string()
    .min(6, { message: "Kode OTP wajib diisi." })
    .regex(/^\d{6}$/, { message: "Kode OTP harus berupa 6 digit angka." }),
});

// Kirim Ulang OTP 
export const resendOTPSchema = z.object({
  email: z
  .email({ message: "Format email tidak valid." }),
});

// LOGIN

export const loginSchema = z.object({
  identity: z
    .string()
    .min(5, { message: "Email atau Username wajib diisi." }),
  password: z
    .string()
    .min(8, { message: "Kata sandi wajib diisi." }),
});

// Type inference untuk TypeScript
export type RegistrasiFormValues = z.infer<typeof registrasiSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type ResendOTPInput = z.infer<typeof resendOTPSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;  