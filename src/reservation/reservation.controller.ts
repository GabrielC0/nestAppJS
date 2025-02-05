import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get()
  async findAll(@Body('userId') userId: string) {
    return this.reservationService.getUserReservations(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationService.cancelReservation(id);
  }
}
