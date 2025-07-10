import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDepartamentoDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({ example: 'Alumbrado Público' })
  @IsString()
  @IsNotEmpty()
  nombre: string

  @ApiProperty({ example: 'jefe.alumbrado@aguimes.es' })
  @IsEmail()
  email_responsable: string

  @ApiProperty({ example: 72 })
  @IsInt()
  tiempo_respuesta_medio: number
}
