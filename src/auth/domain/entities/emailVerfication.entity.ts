export class EmailVerification{
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly token: string,
       public readonly expiredAt: Date,
    public verifiedAt?: Date,
  ) {}

  isExpired(): boolean {
    return this.expiredAt < new Date();
  }

  verify(): void {
    this.verifiedAt = new Date();
  }

  isVerified(): boolean {
    return !!this.verifiedAt;
  }
}