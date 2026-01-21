import { EmailVerification } from "../entities/emailVerfication.entity";
   
   export abstract class EmailVerificationRepository {
       abstract findByToken(token: string): Promise<EmailVerification| null>
       abstract save(emailVerfication: EmailVerification): Promise<void>
   }