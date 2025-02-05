import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('now_playing')
  @ApiOperation({ summary: 'Get now playing movies' })
  async getNowPlaying(@Query('page') page: number = 1) {
    return this.moviesService.getNowPlaying(page);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title' })
  async searchMovies(
    @Query('query') query: string,
    @Query('page') page: number = 1,
  ) {
    return this.moviesService.searchMovies(query, page);
  }

  @Get(':movieId')
  @ApiOperation({ summary: 'Get movie details' })
  async getMovieDetails(@Query('movieId') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }

  @Get('genres')
  @ApiOperation({ summary: 'Get movie genres' })
  async getGenres() {
    return this.moviesService.getGenres();
  }
}
