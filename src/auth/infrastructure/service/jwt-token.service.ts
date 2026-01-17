import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../domain/services/token.service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: {
    userId: string;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
