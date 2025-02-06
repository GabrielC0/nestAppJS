import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsString({ message: "L'ID utilisateur doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "L'ID utilisateur est requis" })
  userId: string;

  @IsNumber({}, { message: "L'ID du film doit être un nombre" })
  @IsNotEmpty({ message: "L'ID du film est requis" })
  movieId: number;

  @IsString({
    message:
      "L'heure de début doit être une chaîne de caractères représentant une date",
  })
  startTime: string;
}
