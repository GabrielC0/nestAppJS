import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNowPlaying(page: number) {
    const apiKey = this.configService.getTmdbApiKey();
    const apiUrl = this.configService.getTmdbApiUrl();
    const response = await lastValueFrom(
      this.httpService.get(`${apiUrl}/movie/now_playing`, {
        params: { api_key: apiKey, page },
      }),
    );
    return response.data;
  }

  async searchMovies(query: string, page: number) {
    const apiKey = this.configService.getTmdbApiKey();
    const apiUrl = this.configService.getTmdbApiUrl();
    const response = await lastValueFrom(
      this.httpService.get(`${apiUrl}/search/movie`, {
        params: { api_key: apiKey, query, page },
      }),
    );
    return response.data.results;
  }

  async getMovie(query: string, page: number) {
    const apiKey = this.configService.getTmdbApiKey();
    const apiUrl = this.configService.getTmdbApiUrl();
    const response = await lastValueFrom(
      this.httpService.get(`${apiUrl}/discover/movie`, {
        params: { api_key: apiKey, query, page },
      }),
    );
    return response.data.results;
  }

  async getMovieDetails(movieId: number) {
    const apiKey = this.configService.getTmdbApiKey();
    const apiUrl = this.configService.getTmdbApiUrl();
    const response = await lastValueFrom(
      this.httpService.get(`${apiUrl}/movie/${movieId}`, {
        params: { api_key: apiKey },
      }),
    );
    return response.data;
  }

  async getGenres() {
    const apiKey = this.configService.getTmdbApiKey();
    const apiUrl = this.configService.getTmdbApiUrl();
    const response = await lastValueFrom(
      this.httpService.get(`${apiUrl}/genre/movie/list`, {
        params: { api_key: apiKey },
      }),
    );
    return response.data.genres;
  }
}
