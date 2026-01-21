import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordReset } from 'src/auth/domain/entities/resetPassword.entity';
import { ResetPasswordRepository } from 'src/auth/domain/repositories/resetPassword.repository';

@Injectable()
export class PasswordResetRepositoryImplemen
  implements ResetPasswordRepository {

  constructor(private readonly prisma: PrismaService) {}

  async findByToken(token: string): Promise<PasswordReset | null> {
    const data = await this.prisma.passwordResets.findUnique({
      where: { token },
    });

    return data
      ? new PasswordReset(
          data.id,
          data.userId,
          data.token,
          new Date(data.expiredAt),
          data.usedAt ? new Date(data.usedAt) : undefined,
        )
      : null;
  }

  async save(entity: PasswordReset): Promise<void> {
    await this.prisma.passwordResets.upsert({
      where: { id: entity.id },
      update: {
        usedAt: entity.usedAt,
      },
      create: {
        id: entity.id,
        userId: entity.userId,
        token: entity.token,
        expiredAt: entity.expiredAt,
      },
    });
  }
}
