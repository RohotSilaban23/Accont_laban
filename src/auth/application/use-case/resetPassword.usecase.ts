import { Inject, Injectable } from "@nestjs/common";
import { ResetPasswordRepository } from "src/auth/domain/repositories/resetPassword.repository";
import { RESET_PASSWORD_REPO } from "src/auth/domain/repositories/resetPassword.token";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { PasswordHasher } from "src/auth/domain/services/password-hasher.service";
import { PASSWORD_HASHER } from "src/auth/domain/services/password-hasher.token";

@Injectable()

export class PasswordResetUsecase {
    constructor (
        @Inject(USER_REPOSITORY)
        private readonly user: UserRepository,
        @Inject(RESET_PASSWORD_REPO)
        private readonly resetPass: ResetPasswordRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passHasher: PasswordHasher,
    ){}

    async excute(token:string, newPassword:string): Promise<void>{
        const reset = await this.resetPass.findByToken(token);
        if (!reset) throw new Error("Invalid token");

        if (reset.isExpired()) throw new Error("Token expired");
        if (reset.isUsed()) throw new Error("Token already used");

        const userData = await this.user.findById(reset.userId);
        if (!userData) throw new Error("User not found");

        userData.password = await this.passHasher.hash(newPassword);
        reset.markUsed();

        await this.user.save(userData);
        await this.resetPass.save(reset);
    }
}