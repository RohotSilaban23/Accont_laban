export abstract class TokenService {
  abstract generateAccessToken(payload: {
    userId: string;
    email: string;
  }): Promise<string>;
}
