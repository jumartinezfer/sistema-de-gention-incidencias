import { IsEmail, IsEnum, IsNotEmpty, IsString, IsInt, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateIncidenciaDto {
  @ApiProperty({ example: 'Fuga de agua en la calle Mayor' })
  @IsString()
  @IsNotEmpty()
  titulo: string

  @ApiProperty({ example: 'Se detecta una fuga en la acera frente al número 15' })
  @IsString()
  @IsNotEmpty()
  descripcion: string

  @ApiProperty({ enum: ['normal', 'alta'] })
  @IsEnum(['normal', 'alta'])
  prioridad: string

  @ApiProperty({ example: 'ciudadano@example.com' })
  @IsEmail()
  ciudadano_email: string

  @ApiProperty({ example: 2 })
  @IsUUID()
  departamento_id: string
}
