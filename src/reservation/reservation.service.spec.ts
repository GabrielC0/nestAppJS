import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from './entities/reservation.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;

  const mockReservationRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    it('should throw a ConflictException if a reservation already exists at the same time', async () => {
      const createReservationDto: CreateReservationDto = {
        userId: '7ca97fe2-4b7f-4557-ba9d-4946fd63c395',
        movieId: 550,
        startTime: '2025-02-05T14:00:00Z',
      };

      mockReservationRepository.findOne.mockResolvedValueOnce({
        id: 'reservation1',
        userId: '7ca97fe2-4b7f-4557-ba9d-4946fd63c395',
        startTime: '2025-02-05T14:00:00Z',
        endTime: '2025-02-05T16:00:00Z',
      });

      await expect(
        service.createReservation(createReservationDto),
      ).rejects.toThrow(
        new ConflictException(
          'Conflit de réservation. Le créneau est déjà réservé.',
        ),
      );
    });

    it('should create a reservation successfully', async () => {
      const createReservationDto: CreateReservationDto = {
        userId: '7ca97fe2-4b7f-4557-ba9d-4946fd63c395',
        movieId: 550,
        startTime: '2025-02-05T14:00:00Z',
      };

      const startDate = new Date(createReservationDto.startTime);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

      const newReservation = {
        ...createReservationDto,
        startTime: startDate,
        endTime: endDate,
      };

      mockReservationRepository.create.mockReturnValue(newReservation);
      mockReservationRepository.save.mockResolvedValue(newReservation);

      const result = await service.createReservation(createReservationDto);

      expect(result).toEqual(newReservation);
      expect(mockReservationRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createReservationDto,
          startTime: expect.any(Date),
          endTime: expect.any(Date),
        }),
      );
      expect(mockReservationRepository.save).toHaveBeenCalledWith(
        newReservation,
      );
    });
  });

  describe('getUserReservations', () => {
    it('should return an array of reservations', async () => {
      const userId = '7ca97fe2-4b7f-4557-ba9d-4946fd63c395';
      const reservations = [
        {
          userId,
          movieId: 550,
          startTime: '2025-02-05T14:00:00Z',
          endTime: '2025-02-05T16:00:00Z',
        },
      ];

      mockReservationRepository.find.mockResolvedValue(reservations);

      const result = await service.getUserReservations(userId);
      expect(result).toEqual(reservations);
      expect(mockReservationRepository.find).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });

  describe('cancelReservation', () => {
    it('should throw a NotFoundException if the reservation is not found', async () => {
      const reservationId = 'reservation1';

      mockReservationRepository.findOne.mockResolvedValue(null);

      await expect(service.cancelReservation(reservationId)).rejects.toThrow(
        new NotFoundException('Réservation non trouvée'),
      );
    });

    it('should cancel the reservation successfully', async () => {
      const reservationId = 'reservation1';
      const reservation = {
        id: reservationId,
        userId: '7ca97fe2-4b7f-4557-ba9d-4946fd63c395',
        movieId: 550,
        startTime: '2025-02-05T14:00:00Z',
        endTime: '2025-02-05T16:00:00Z',
      };

      mockReservationRepository.findOne.mockResolvedValue(reservation);
      mockReservationRepository.remove.mockResolvedValue(undefined);

      await expect(
        service.cancelReservation(reservationId),
      ).resolves.toBeUndefined();
      expect(mockReservationRepository.remove).toHaveBeenCalledWith(
        reservation,
      );
    });
  });
});
