import { Injectable } from "@nestjs/common";
import { User } from "src/auth/domain/entities/user.entity";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { Email } from "src/auth/domain/value-objects/email.vo";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepositoryImpl implements UserRepository{
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    console.log(email)
   const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
    );

  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  }
}