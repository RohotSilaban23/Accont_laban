export class PasswordReset{
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly token: string,
        public readonly expiredAt: Date,
        public usedAt?: Date,
    ) {}

  isExpired(): boolean {
    return this.expiredAt < new Date();
  }

  markUsed(): void {
    this.usedAt = new Date();
  }

  isUsed(): boolean {
    return !!this.usedAt;
  }
}