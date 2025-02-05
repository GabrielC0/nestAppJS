import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: "User's username",
    example: 'john_doe',
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  username: string;

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
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Le mot de passe doit contenir au moins une lettre majuscule',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  password: string;
}
