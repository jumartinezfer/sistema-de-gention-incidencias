import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common'
import { SeguimientosService } from './seguimientos.service'
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto'
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Seguimiento } from './entities/seguimiento.entity'

@ApiTags('Seguimientos')
@Controller('seguimientos')
export class SeguimientosController {
  constructor(private readonly seguimientosService: SeguimientosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un seguimiento para una incidencia' })
  create(@Body() dto: CreateSeguimientoDto) {
    return this.seguimientosService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los seguimientos' })
  async findAll(): Promise<Seguimiento[]> {
    return await this.seguimientosService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un seguimiento por ID' })
  async findOne(@Param('id') id: string): Promise<Seguimiento> {
    return await this.seguimientosService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un seguimiento' })
  update(@Param('id') id: string, @Body() dto: UpdateSeguimientoDto) {
    return this.seguimientosService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un seguimiento' })
  remove(@Param('id') id: string) {
    return this.seguimientosService.remove(id)
  }
}
