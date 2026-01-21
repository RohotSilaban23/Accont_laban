import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { EmailVerificationRepository } from "src/auth/domain/repositories/emailVerification.repository";
import { EMAIL_VERIFICATION_REPO } from "src/auth/domain/repositories/emailVerification.token";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class EmailVerificationUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly user: UserRepository,
        @Inject(EMAIL_VERIFICATION_REPO)
        private readonly emailRepo: EmailVerificationRepository
    ){}

    async excute(token: string): Promise<void>{
        const verification = await this.emailRepo.findByToken(token);
        if(!verification){
            throw new Error("Invalid Verification Token")
        }
        if (verification.isExpired()) {
            throw new Error("Verification token expired");
        }

        if (verification.isVerified()) {
            throw new Error("Email already verified");
        }

        const userData = await this.user.findById(verification.userId)
        if(!userData){
            throw new Error("Email Not Found!")
        }

        userData.verifyEmail();
        verification.verify();

        await this.user.save(userData);
        await this.emailRepo.save(verification);
    }
}