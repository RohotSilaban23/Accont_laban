import { Module } from '@nestjs/common';
import { AuthController } from './auth/interfaces/auth.controller';
import { RegisterUsecase } from './auth/application/use-case/register.usecase';
import { LoginUseCase } from './auth/application/use-case/login.usecase';
import { UserRepositoryImpl } from './auth/infrastructure/persistence/user.repository.impl';
import { BcryptHasher } from './auth/infrastructure/service/bcrypt-hasher.service';
import { JwtTokenService } from './auth/infrastructure/service/jwt-token.service';
import { USER_REPOSITORY } from './auth/domain/repositories/user.token';
import { PASSWORD_HASHER } from './auth/domain/services/password-hasher.token';
import { TOKEN_SERVICE } from './auth/domain/services/token-service.token';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { MAILER } from './auth/domain/services/mailer.token';
import { MailerService } from './auth/infrastructure/service/mailer.service';
import { EMAIL_VERIFICATION_REPO } from './auth/domain/repositories/emailVerification.token';
import { EmailVerificationRepositoryImplemen } from './auth/infrastructure/persistence/emailVerified.repository.impl';
import { EmailVerificationUsecase } from './auth/application/use-case/emailVerifcation.usecase';
import { ForgotPasswordUsecase } from './auth/application/use-case/forgotPassword.usecase';
import { PasswordResetUsecase } from './auth/application/use-case/resetPassword.usecase';
import { RESET_PASSWORD_REPO } from './auth/domain/repositories/resetPassword.token';
import { PasswordResetRepositoryImplemen } from './auth/infrastructure/persistence/resetPassword.repository';
import { ITEM_REPO } from './transaction/domain/repositories/itemToken.repositori';
import { ItemRepositoryImpl } from './transaction/infrastricture/persintence/item.repository.impl';
import { CreateItem } from './transaction/aplication/createItem.usecase';
import { ItemController } from './transaction/interface/item.controller';
import { FindItemByType } from './transaction/aplication/findIitemByProduct.usecase';
import { DeleteItem } from './transaction/aplication/itemDelete.usecase';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'DEV_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
   controllers: [AuthController, ItemController],
  providers: [
    RegisterUsecase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptHasher,
    },
    {
      provide: MAILER,
      useClass: MailerService,
    },
    {
      provide: EMAIL_VERIFICATION_REPO,
      useClass: EmailVerificationRepositoryImplemen,
    },
    {
      provide: RESET_PASSWORD_REPO,
      useClass: PasswordResetRepositoryImplemen,
    },
    {
      provide: ITEM_REPO,
      useClass: ItemRepositoryImpl,
    },
    LoginUseCase,
    EmailVerificationUsecase,
    ForgotPasswordUsecase,
    PasswordResetUsecase,
    CreateItem,
    FindItemByType,
    DeleteItem,
    

    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
  ],
  exports: [MAILER],

})
export class AppModule {}
