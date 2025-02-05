import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { userId, movieId, startTime } = createReservationDto;
    const startDate = new Date(startTime);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    const conflictingReservation = await this.reservationRepository.findOne({
      where: [
        {
          userId,
          startTime: LessThanOrEqual(endDate),
          endTime: MoreThanOrEqual(startDate),
        },
      ],
    });

    if (conflictingReservation) {
      throw new ConflictException(
        'Conflit de réservation. Le créneau est déjà réservé.',
      );
    }

    const reservation = this.reservationRepository.create({
      userId,
      movieId,
      startTime: startDate,
      endTime: endDate,
    });

    return this.reservationRepository.save(reservation);
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { userId } });
  }

  async cancelReservation(reservationId: string): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException('Réservation non trouvée');
    }
    await this.reservationRepository.remove(reservation);
  }
}
