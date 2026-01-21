import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { ResetPasswordRepository } from "src/auth/domain/repositories/resetPassword.repository";
import { RESET_PASSWORD_REPO } from "src/auth/domain/repositories/resetPassword.token";
import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { PasswordReset } from "src/auth/domain/entities/resetPassword.entity";
import { MAILER } from "src/auth/domain/services/mailer.token";
import { MailerPort } from "src/auth/domain/services/mailer.port";

@Injectable()

export class ForgotPasswordUsecase {
    constructor (
        @Inject(USER_REPOSITORY)
        private readonly user: UserRepository,
        @Inject(RESET_PASSWORD_REPO)
        private readonly resetPass: ResetPasswordRepository,
        @Inject(MAILER)
        private readonly mailerPort: MailerPort,
    ){}

    async execute(email: string): Promise<void>{
        const userData = await this.user.findByEmail(email);
        if(!userData){
            throw new Error("Accont not Found!")
        }

        const tokenResetPass = uuid();

        const reset = new PasswordReset(
            uuid(),
            userData.id,
            tokenResetPass ,
            new Date(Date.now() + 1000 * 60 * 30), // 30 menit
        );

        await this.resetPass.save(reset);

         await this.mailerPort.sendResetPasswordEmail(
            userData.email,
            tokenResetPass,
        );

    }
}