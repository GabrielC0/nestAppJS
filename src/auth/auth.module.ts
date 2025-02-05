import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generates a JWT token for a given user
   * @param user User object containing user information
   * @returns JWT token string
   */
  generateToken(user: any): string {
    try {
      // Remove sensitive information before token generation
      const { password, ...userWithoutPassword } = user;

      // Generate JWT token
      const token = this.jwtService.sign(userWithoutPassword, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '24h',
      });

      return token;
    } catch (error) {
      throw new Error('Token generation failed');
    }
  }

  /**
   * Verifies and decodes a JWT token
   * @param token JWT token string
   * @returns Decoded user object
   */
  verifyToken(token: string): any {
    try {
      // Verify and decode the token
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

// Module configuration
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

// Example usage in a controller
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: any) {
    // Here you would typically validate the user credentials first
    const token = this.authService.generateToken(user);
    return { access_token: token };
  }

  @Post('verify')
  async verify(@Body() tokenData: { token: string }) {
    const userData = this.authService.verifyToken(tokenData.token);
    return userData;
  }
}
