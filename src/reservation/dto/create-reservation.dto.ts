import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsString({ message: "L'ID utilisateur doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "L'ID utilisateur est requis" })
  userId: string;

  @IsString({ message: "L'ID du film doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "L'ID du film est requis" })
  movieId: string;

  @IsDateString({}, { message: "L'heure de début doit être une date valide" })
  startTime: string;
}
