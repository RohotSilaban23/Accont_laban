export abstract class MailerPort {
  abstract sendVerificationEmail(
    to: string,
    token: string,
  ): Promise<void>;

  abstract sendResetPasswordEmail(
    to: string,
    token: string,
  ): Promise<void>;
}
