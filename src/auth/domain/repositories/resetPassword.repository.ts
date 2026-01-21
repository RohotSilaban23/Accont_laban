import { PasswordReset } from "../entities/resetPassword.entity";
   
   export abstract class ResetPasswordRepository {
       abstract findByToken(token: string): Promise<PasswordReset| null>
       abstract save(entity: PasswordReset): Promise<void>
   }