import { IsInt, IsString, IsNotEmpty, Min, Max, IsDate } from "class-validator";

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsInt()
    goalCount: number

    @IsNotEmpty()
    @IsString()
    birthDate: string

    teamId = null
}
