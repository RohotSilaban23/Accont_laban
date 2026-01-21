import { Email } from "../value-objects/email.vo";

export class User{
    constructor (
        public readonly id: string,
        public readonly email: string,
        public password: string,
        private _isEmailVerified: boolean,
    ){}

    get isEmailVerified(): boolean {
        return this._isEmailVerified;
    }

    verifyEmail(): void {
        if(this.isEmailVerified){
            throw new Error('Email Already Verified!')
        }
        this._isEmailVerified = true;
    }

    changePassword(hashedPassword: string): void {
        this.password = hashedPassword;
    }
}