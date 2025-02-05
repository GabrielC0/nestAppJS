import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'Password123',
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  password: string;
}
