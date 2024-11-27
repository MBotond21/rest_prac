import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const player = await this.playersService.findOne(+id);
    if (!player) throw new NotFoundException('No player with ID ' + id);
    return player;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playersService.update(+id, updatePlayerDto);
    if (!player) throw new NotFoundException('No player with ID ' + id);
    return player;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const success = await this.playersService.remove(+id);
    if (!success) {
      throw new NotFoundException('No player with ID ' + id);
    }
  }
}
