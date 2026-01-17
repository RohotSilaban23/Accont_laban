import { throwError } from "rxjs";

export class Password{
    private readonly value: string;

    constructor(password: string) {
        if(password.length < 6){
            throw new Error('Password too Short');
        }
        this.value = password;
    }

    getValue() : string{
        return this.value;
    }
}