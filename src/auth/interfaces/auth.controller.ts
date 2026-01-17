import { Body, Controller, Post } from "@nestjs/common";
import { LoginUseCase } from "../application/use-case/login.usecase";
import { RegisterUsecase } from "../application/use-case/register.usecase";

// auth/interfaces/auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: RegisterUsecase,
    private readonly login: LoginUseCase,
  ) {}

  @Post('register')
  registerUser(@Body() dto: any) {
    return this.register.execute(dto.email, dto.password);
  }

  @Post('login')
  loginUser(@Body() dto: any) {
    return this.login.execute(dto.email, dto.password);
  }
}
