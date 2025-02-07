import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getMovieDetails(movieId: number) {
    const apiKey = this.configService.getTmdbApiKey();
    const response = await lastValueFrom(
      this.httpService.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: { api_key: apiKey },
      }),
    );
    return response.data;
  }

  async searchMovies(query: string) {
    const apiKey = this.configService.getTmdbApiKey();
    const response = await lastValueFrom(
      this.httpService.get('https://api.themoviedb.org/3/search/movie', {
        params: { api_key: apiKey, query },
      }),
    );
    return response.data.results;
  }

  async getMovies(query: string) {
    const apiKey = this.configService.getTmdbApiKey();
    const response = await lastValueFrom(
      this.httpService.get('https://api.themoviedb.org/3/discover/movie', {
        params: { api_key: apiKey, query },
      }),
    );
    return response.data.results;
  }
}
