import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post(':id/addPlayer/:playerId')
  async addPlayerToTeam(@Param('id') id: string, @Param('playerId') playerId: string){
    const team = await this.teamsService.addPlayerToTeam(+id, +playerId);
    if (!team) throw new NotFoundException(`Team ID (${id}) or Player ID (${playerId}) is wrong`);
    return team;
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('/players')
  findAllWithPlayers() {
    return this.teamsService.findAllWithPlayers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(+id);
    if (!team) throw new NotFoundException('No team with ID ' + id);
    return team;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const team = await this.teamsService.update(+id, updateTeamDto);
    if (!team) throw new NotFoundException('No team with ID ' + id);
    return team;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const success = await this.teamsService.remove(+id);
    if (!success) {
      throw new NotFoundException('No team with ID ' + id);
    }
  }
}
