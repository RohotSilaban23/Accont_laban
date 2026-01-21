import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { LoginUseCase } from "../application/use-case/login.usecase";
import { RegisterUsecase } from "../application/use-case/register.usecase";
import { EmailVerificationUsecase } from "../application/use-case/emailVerifcation.usecase";
import { ForgotPasswordUsecase } from "../application/use-case/forgotPassword.usecase";
import { PasswordResetUsecase } from "../application/use-case/resetPassword.usecase";

// auth/interfaces/auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: RegisterUsecase,
    private readonly login: LoginUseCase,
    private readonly emailVerification: EmailVerificationUsecase,
    private readonly forgotPassword : ForgotPasswordUsecase,
    private readonly resetPassword : PasswordResetUsecase,

  ) {}

  @Post('register')
  registerUser(@Body() dto: any) {
    return this.register.execute(dto.email, dto.password);
  }

  @Post('login')
  loginUser(@Body() dto: any) {
    return this.login.execute(dto.email, dto.password);
  }

  @Get("verify-email")
    async verifyEmail(@Query("token") token: string) {
      await this.emailVerification.excute(token);
      return {
        message: "Email successfully verified",
      };
    }
  
  @Post("forget-password")
    async requestReset(@Body("email") email: string) {
      return this.forgotPassword.execute(email);
  }

   @Post("reset-password")
    async newPassword(
      @Query("token") token: string,
      @Body("password") password: string ){
        return this.resetPassword.excute(token, password);
      }
}
