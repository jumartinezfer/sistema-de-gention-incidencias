import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Incidencia } from './entities/incidencia.entity'
import { Repository } from 'typeorm'
import { CreateIncidenciaDto } from './dto/create-incidencia.dto'
import { Departamento } from '../departamentos/entities/departamento.entity'
import { IncidenciaPendienteView } from './pendientes/entity'
import { IncidenciasPorDepartamentoView } from './porDepartamento/entity'
import axios from 'axios'

@Injectable()
export class IncidenciasService {
  pendientesRepo: any
  porDepartamentoRepo: any
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepo: Repository<Incidencia>,

    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}
  async create(dto: CreateIncidenciaDto): Promise<Incidencia> {
    const departamento = await this.departamentoRepo.findOneBy({
      id: dto.departamento_id,
    })

    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado')
    }

    const incidencia = this.incidenciaRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      estado: 'pendiente',
      prioridad: dto.prioridad,
      ciudadano_email: dto.ciudadano_email,
      fecha_creacion: new Date(),
      departamento,
    })

    const savedIncidencia = await this.incidenciaRepo.save(incidencia)

    // Llamada al webhook de producción de n8n
    try {
      await axios.post('http://localhost:5678/webhook/incidencias', {
        titulo: savedIncidencia.titulo,
        descripcion: savedIncidencia.descripcion,
        estado: savedIncidencia.estado,
        prioridad: savedIncidencia.prioridad,
        departamento_id: departamento.id,
        ciudadano_email: savedIncidencia.ciudadano_email,
        fecha_creacion: savedIncidencia.fecha_creacion.toISOString(),
      })
      console.log('Incidencia enviada a n8n correctamente')
    } catch (error) {
      console.error('Error al enviar incidencia a n8n:', error.message)
    }

    return savedIncidencia
  }

  async getPendientes(id: string): Promise<IncidenciaPendienteView> {
    const incidencia = await this.incidenciaRepo.findOne({
      where: { id },
      relations: ['departamento'],
    })
    if (!incidencia) {
      throw new NotFoundException('Incidencia no encontrada')
    }
    return {
      ...incidencia,
      departamento: incidencia.departamento.nombre,
    } as IncidenciaPendienteView
  }

  async getResumenPorDepartamento(
    departamentoId: string,
  ): Promise<IncidenciasPorDepartamentoView> {
    // Busca el departamento y sus incidencias relacionadas
    const departamento = await this.departamentoRepo.findOne({
      where: { id: departamentoId },
      relations: ['incidencias'],
    })

    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado')
    }

    // Prepara el resumen
    const total_incidencias = departamento.incidencias.length

    // para filtrar por estado
    const pendientes = departamento.incidencias.filter(
      (inc) => inc.estado === 'pendiente',
    ).length
    const resueltas = departamento.incidencias.filter(
      (inc) => inc.estado === 'resuelta',
    ).length

    return {
      departamento_id: departamento.id,
      departamento: departamento.nombre,
      incidencias: departamento.incidencias,
      total_incidencias,
      pendientes,
      resueltas,
    }
  }
}
