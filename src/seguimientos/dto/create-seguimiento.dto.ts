import { IsNotEmpty, IsString, IsInt, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSeguimientoDto {
  @ApiProperty({ example: 'Se inició la revisión del caso' })
  @IsString()
  @IsNotEmpty()
  comentario: string

  @ApiProperty({ example: 'pendiente' })
  @IsString()
  @IsNotEmpty()
  estado_anterior: string

  @ApiProperty({ example: 'en revisión' })
  @IsString()
  @IsNotEmpty()
  estado_nuevo: string

  @ApiProperty({ example: 5 })
  @IsUUID()
  incidencia_id: string
}
