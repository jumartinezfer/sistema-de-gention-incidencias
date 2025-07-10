import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common'
import { DepartamentosService } from './departamentos.service'
import { CreateDepartamentoDto } from './dto/create-departamento.dto'
import { UpdateDepartamentoDto } from './dto/update-departamento.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Departamento } from './entities/departamento.entity'

@ApiTags('Departamentos')
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo departamento' })
  @ApiResponse({ status: 201, type: Departamento })
  async create(@Body() dto: CreateDepartamentoDto): Promise<Departamento> {
    return await this.departamentosService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los departamentos' })
  async findAll(): Promise<Departamento[]> {
    return await this.departamentosService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  async findOne(@Param('id') id: string): Promise<Departamento> {
    return await this.departamentosService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un departamento' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    return await this.departamentosService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un departamento' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.departamentosService.remove(id)
  }
}
