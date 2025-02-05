import { Controller, Get, Query, Param } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('TMDb')
@Controller('tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('movie/:id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  async getMovieDetails(@Param('id') id: number) {
    return this.tmdbService.getMovieDetails(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by query' })
  async searchMovies(@Query('query') query: string) {
    return this.tmdbService.searchMovies(query);
  }
}
