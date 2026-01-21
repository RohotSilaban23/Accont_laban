import { Injectable } from '@nestjs/common';
import { MailerPort } from 'src/auth/domain/services/mailer.port';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService implements MailerPort {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    token: string,
  ): Promise<void> {
    const link =
      `http://localhost:3000/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"My App" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Verifikasi Email',
      html: `
        <h2>Verifikasi Email</h2>
        <p>Klik link berikut untuk verifikasi akun Anda:</p>
        <a href="${link}">${link}</a>
      `,
    });
  }

 async sendResetPasswordEmail(
  to: string,
  token: string,
): Promise<void> {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  await this.transporter.sendMail({
    from: `"No Reply" <${process.env.MAIL_USER}>`,
    to,
    subject: "Reset Password Akun Anda",
    html: `
      <h3>Permintaan Reset Password</h3>
      <p>Anda menerima email ini karena ada permintaan reset password.</p>
      <p>Silakan klik link di bawah ini untuk mengganti password Anda:</p>

      <p>
        <a href="${resetLink}"
           style="display:inline-block;padding:10px 16px;
                  background:#2563eb;color:#fff;
                  text-decoration:none;border-radius:6px">
          Reset Password
        </a>
      </p>

      <p>Link ini berlaku selama <b>15 menit</b>.</p>
      <p>Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
    `,
  });
}
}
