import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  movieId: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
