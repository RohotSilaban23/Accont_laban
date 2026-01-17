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

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'DEV_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
   controllers: [AuthController],
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
    LoginUseCase,

    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
  ],
})
export class AppModule {}
