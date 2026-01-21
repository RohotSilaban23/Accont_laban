import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailVerification } from 'src/auth/domain/entities/emailVerfication.entity';
import { EmailVerificationRepository } from 'src/auth/domain/repositories/emailVerification.repository';

@Injectable()
export class EmailVerificationRepositoryImplemen
  implements EmailVerificationRepository {

  constructor(private readonly prisma: PrismaService) {}

  async findByToken(token: string): Promise<EmailVerification | null> {
    const data = await this.prisma.emailVerificatioan.findUnique({
      where: { token },
    });

    return data
      ? new EmailVerification(
          data.id,
          data.userId,
          data.token,
          data.expiredAt,
          data.verifiedAt ?? undefined,
        )
      : null;
  }

  async save(entity: EmailVerification): Promise<void> {
    await this.prisma.emailVerificatioan.upsert({
      where: { id: entity.id },
      update: {
        verifiedAt: entity.verifiedAt,
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
