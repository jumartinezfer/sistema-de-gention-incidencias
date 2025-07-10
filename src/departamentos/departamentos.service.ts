import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Departamento } from './entities/departamento.entity'
import { Repository } from 'typeorm'
import { CreateDepartamentoDto } from './dto/create-departamento.dto'
import { UpdateDepartamentoDto } from './dto/update-departamento.dto'

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  async create(dto: CreateDepartamentoDto): Promise<Departamento> {
    const nuevo = this.departamentoRepo.create(dto)
    return await this.departamentoRepo.save(nuevo)
  }

  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepo.find()
  }
  async findOne(id: string): Promise<Departamento> {
    const dep = await this.departamentoRepo.findOneBy({ id: id.toString() })
    if (!dep) throw new NotFoundException('Departamento no encontrado')
    return dep
  }

  async update(id: string, dto: UpdateDepartamentoDto): Promise<Departamento> {
    const dep = await this.findOne(id)
    const actualizado = Object.assign(dep, dto)
    return await this.departamentoRepo.save(actualizado)
  }

  async remove(id: string): Promise<void> {
    const dep = await this.findOne(id)
    await this.departamentoRepo.remove(dep)
  }
}
