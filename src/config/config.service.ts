import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  getTmdbApiKey(): string {
    return this.configService.get<string>('TMDB_API_KEY') || '';
  }

  getTmdbApiUrl(): string {
    return this.configService.get<string>('TMDB_API_URL') || '';
  }
}
