import { Injectable } from "@nestjs/common";
import { User } from "src/auth/domain/entities/user.entity";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { Email } from "src/auth/domain/value-objects/email.vo";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepositoryImpl implements UserRepository{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    return data ? this.toEntity(data) : null;
  }


  async findByEmail(email: string) {
    console.log(email)
   const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return user ? this.toEntity(user) : null;

  }

 async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        password: user.password,
        isEmailVerified: user.isEmailVerified,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        isEmailVerified: user.isEmailVerified,
      },
    });
  }

   private toEntity(data: any): User {
    return new User(
      data.id,
      data.email,
      data.password,
      data.isEmailVerified,
    );
  }
}