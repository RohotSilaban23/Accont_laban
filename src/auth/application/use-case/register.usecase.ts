import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { Email } from "src/auth/domain/value-objects/email.vo";
import { User } from "src/auth/domain/entities/user.entity";
import { PasswordHasher } from "src/auth/domain/services/password-hasher.service";
import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/auth/domain/repositories/user.token";
import { PASSWORD_HASHER } from "src/auth/domain/services/password-hasher.token";

@Injectable()
export class RegisterUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHaser: PasswordHasher,
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
        );

        console.log("data",user);

        await this.userRepo.save(user);
        return user;
        } else {
            return email;
        }

       
    } 
    

}