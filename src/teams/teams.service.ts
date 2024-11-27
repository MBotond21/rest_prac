import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeamsService {
  db: PrismaService

  constructor(db: PrismaService){
    this.db = db
  }

  create(createTeamDto: CreateTeamDto) {
    return this.db.team.create({
      data: createTeamDto
    });
  }

  findAll() {
    return this.db.team.findMany();
  }

  findAllWithPlayers() {
    return this.db.team.findMany({
      include: {
        players: true
      }
    });
  }

  async findOne(id: number) {
    return await this.db.team.findUnique({
      where: { id: id },
      include: {
        players: true
      }
    });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    try{
      return await this.db.team.update({
        where: { id: id },
        data: updateTeamDto
      });
    }catch{ return undefined }
  }

  async addPlayerToTeam(teamId: number, playerId: number){
    try{
      return await this.db.team.update({
        where: { id: teamId },
        data: {
          players: {
            connect: [{ id: playerId }]
          }
        }
      })
    }catch { return undefined }
  }

  async removePlayerFromTeam(teamId: number, playerId: number){
    try{
      return await this.db.team.update({
        where: { id: teamId },
        data: {
          players: {
            disconnect: [{ id: playerId }]
          }
        }
      })
    }catch { return undefined }
  }

  async remove(id: number) {
    try{
      return await this.db.team.delete({
        where: { id }
      })
    }catch {
      return undefined
    }
  }
}
