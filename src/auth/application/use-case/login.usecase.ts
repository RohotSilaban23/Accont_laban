import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { PasswordHasher } from "src/auth/domain/services/password-hasher.service";
import { PASSWORD_HASHER } from "src/auth/domain/services/password-hasher.token";
import { TOKEN_SERVICE } from "src/auth/domain/services/token-service.token";
import { TokenService } from "src/auth/domain/services/token.service";
import { Email } from "src/auth/domain/value-objects/email.vo";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher,
        @Inject(TOKEN_SERVICE)
        private readonly tokenService : TokenService,
    ){}

    async execute(emailStr: string, passwordStr: string) {
        const email = Email.create(emailStr);
        const user =  await this.userRepo.findByEmail(emailStr);
    
        if(!user) {
            throw new Error('Invalid Credentials!');
        }
        if(user.isEmailVerified == false){
            throw new Error('Account not verified!');
        }

        const match = await this.passwordHasher.compare(
            passwordStr,
            user.password,
        );

        if(!match) {
             throw new Error('Invalid Credentials!');
        }

        return this.tokenService.generateAccessToken({
              userId: user.id,
              email: user.email,
        });

    }
}