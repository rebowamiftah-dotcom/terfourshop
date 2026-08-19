import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationOTP(
  email: string,
  otp: string
) {
  await transporter.sendMail({
    from: `"TerfourShop" ${process.env.SMTP_FROM}`,
    to: email,

    subject: "Kode Verifikasi Email TerfourShop",

    text: `
Kode verifikasi TerfourShop kamu adalah: ${otp}

Kode ini berlaku selama 5 menit.

Jika Anda tidak melakukan registrasi, abaikan email ini.
    `,

    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verifikasi Email TerfourShop</h2>

        <p>
          Gunakan kode berikut untuk menyelesaikan registrasi:
        </p>

        <div
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 24px 0;
          "
        >
          ${otp}
        </div>

        <p>
          Kode ini berlaku selama <strong>5 menit</strong>.
        </p>

        <p>
          Jika Anda tidak melakukan registrasi,
          abaikan email ini.
        </p>
      </div>
    `,
  });
}