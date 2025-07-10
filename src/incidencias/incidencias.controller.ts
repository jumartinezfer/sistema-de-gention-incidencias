import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { IncidenciasService } from './incidencias.service'
import { CreateIncidenciaDto } from './dto/create-incidencia.dto'
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { IncidenciaPendienteView } from './pendientes/entity'
import { IncidenciasPorDepartamentoView } from './porDepartamento/entity'
import { Incidencia } from './entities/incidencia.entity'

@Controller('incidencias')
export class IncidenciasController {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva incidencia' })
  async create(@Body() dto: CreateIncidenciaDto): Promise<Incidencia> {
    return await this.incidenciasService.create(dto)
  }

  @Get('pendientes/:id')
  @ApiOperation({ summary: 'Obtener una incidencia pendiente por ID' })
  async getPendienteById(
    @Param('id') id: string,
  ): Promise<IncidenciaPendienteView> {
    return await this.incidenciasService.getPendientes(id)
  }

  @Get('resumen-por-departamento/:departamentoId')
  @ApiOperation({
    summary: 'Obtener el resumen de incidencias por departamento',
  })
  async getResumenPorDepartamento(
    @Param('departamentoId') departamentoId: string,
  ): Promise<IncidenciasPorDepartamentoView> {
    return await this.incidenciasService.getResumenPorDepartamento(
      departamentoId,
    )
  }
}
