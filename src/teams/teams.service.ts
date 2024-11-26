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

  findOne(id: number) {
    return this.db.team.findUnique({
      where: { id: id },
      include: {
        players: true
      }
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.db.team.update({
      where: { id: id },
      data: updateTeamDto
    });
  }

  addPlayerToTeam(teamId: number, playerId: number){
    return this.db.team.update({
      where: { id: teamId },
      data: {
        players: {
          connect: [{ id: playerId }]
        }
      }
    })
  }

  remove(id: number) {
    return this.db.team.delete({
      where: { id: id }
    });
  }
}
