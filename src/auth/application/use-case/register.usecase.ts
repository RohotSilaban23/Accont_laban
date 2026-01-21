import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { Email } from "src/auth/domain/value-objects/email.vo";
import { User } from "src/auth/domain/entities/user.entity";
import { PasswordHasher } from "src/auth/domain/services/password-hasher.service";
import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { PASSWORD_HASHER } from "src/auth/domain/services/password-hasher.token";
import { MAILER } from "src/auth/domain/services/mailer.token";
import { EmailVerificationRepository } from "src/auth/domain/repositories/emailVerification.repository";
import { EMAIL_VERIFICATION_REPO } from "src/auth/domain/repositories/emailVerification.token";
import { EmailVerification } from "src/auth/domain/entities/emailVerfication.entity";
import { MailerPort } from "src/auth/domain/services/mailer.port";



@Injectable()
export class RegisterUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHaser: PasswordHasher,
        @Inject(EMAIL_VERIFICATION_REPO)
        private readonly emailVericationRepository: EmailVerificationRepository,
        @Inject(MAILER)
        private readonly mailerPort: MailerPort,

    ) {}

    async execute(emailStr: string, passwordStr: string) {
        console.log(emailStr);
        const email = Email.create(emailStr);
        if(email){
             const exist = await this.userRepo.findByEmail(emailStr);
        if(exist){
            throw new Error('Email Already Registered!!');
        }

        const hash = await this.passwordHaser.hash(passwordStr);

        const user = new User(
            uuid(),
            emailStr,
            hash,
            false
        );

        console.log("data",user);

        await this.userRepo.save(user);

        const tokenVarification = uuid();
        const verification = new EmailVerification(
            uuid(),
            user.id,
            tokenVarification,
            new Date(Date.now() + 1000 * 60 * 60), // 1 jam
        );

        await this.emailVericationRepository.save(verification);
        await this.mailerPort.sendVerificationEmail(
            user.email,
            tokenVarification,
        );

    return {
      message: 'Register success, please check your email',
    };

       
    } 
    

}
}