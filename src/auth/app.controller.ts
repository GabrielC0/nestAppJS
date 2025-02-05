import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const response = await this.authService.register(registerDto);
      return {
        message: 'Utilisateur créé avec succès',
        user: response.user,
        access_token: response.access_token,
      };
    } catch (error) {
      throw new BadRequestException(
        error.response || "Erreur lors de l'enregistrement",
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const response = await this.authService.login(loginDto);
      return {
        message: 'Connexion réussie',
        user: response.user,
        access_token: response.access_token,
      };
    } catch (error) {
      throw new BadRequestException(
        error.response || 'Email ou mot de passe incorrect',
      );
    }
  }
}
