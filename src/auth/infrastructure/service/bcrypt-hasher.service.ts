import * as bcrypt from 'bcrypt';
import { PasswordHasher } from 'src/auth/domain/services/password-hasher.service';

export class BcryptHasher implements PasswordHasher {
    async hash(password: string): Promise<string>{
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}