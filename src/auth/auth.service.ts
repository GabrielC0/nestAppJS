import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) throw new ConflictException('Cet email est déjà utilisé');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return this.createAuthResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    return this.createAuthResponse(user);
  }

  private createAuthResponse(user: User) {
    const token = this.generateToken(user);
    const { password, ...result } = user;
    return { user: result, access_token: token };
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    const secret = this.configService.get('JWT_SECRET', 'default_secret');
    if (!secret) throw new Error('JWT_SECRET is not defined');
    return this.jwtService.sign(payload, { secret });
  }
}
