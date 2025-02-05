import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TmdbService } from './tmdb.service';
import { TmdbController } from './tmdb.controller';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [HttpModule],
  controllers: [TmdbController],
  providers: [TmdbService, ConfigService],
})
export class TmdbModule {}
