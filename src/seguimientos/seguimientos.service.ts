import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Seguimiento } from './entities/seguimiento.entity'
import { Incidencia } from '../incidencias/entities/incidencia.entity'
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto'
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto'

@Injectable()
export class SeguimientosService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly seguimientoRepo: Repository<Seguimiento>,

    @InjectRepository(Incidencia)
    private readonly incidenciaRepo: Repository<Incidencia>,
  ) {}

  async create(dto: CreateSeguimientoDto): Promise<Seguimiento> {
    const incidencia = await this.incidenciaRepo.findOneBy({
      id: dto.incidencia_id.toString(),
    })
    if (!incidencia) throw new NotFoundException('Incidencia no encontrada')

    // Crear el seguimiento
    const seguimiento = this.seguimientoRepo.create({
      comentario: dto.comentario,
      estado_anterior: dto.estado_anterior,
      estado_nuevo: dto.estado_nuevo,
      fecha: new Date(),
      incidencia,
    })

    const nuevoSeguimiento = await this.seguimientoRepo.save(seguimiento)
    // Actualizar el estado de la incidencia
    incidencia.estado = dto.estado_nuevo
    await this.incidenciaRepo.save(incidencia)

    return nuevoSeguimiento
  }

  async findAll(): Promise<Seguimiento[]> {
    return await this.seguimientoRepo.find({
      relations: ['incidencia'],
    })
  }

  async findOne(id: string): Promise<Seguimiento> {
    const seguimiento = await this.seguimientoRepo.findOne({
      where: { id: id },
      relations: ['incidencia'],
    })
    if (!seguimiento) throw new NotFoundException('Seguimiento no encontrado')
    return seguimiento
  }

  async update(id: string, dto: UpdateSeguimientoDto): Promise<Seguimiento> {
    const seguimiento = await this.findOne(id)
    Object.assign(seguimiento, dto)
    return this.seguimientoRepo.save(seguimiento)
  }

  async remove(id: string): Promise<void> {
    const seguimiento = await this.findOne(id)
    await this.seguimientoRepo.remove(seguimiento)
  }
}
