import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IncidenciasService } from './incidencias.service'
import { IncidenciasController } from './incidencias.controller'
import { Incidencia } from './entities/incidencia.entity'
import { Departamento } from '../departamentos/entities/departamento.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia, Departamento])],
  controllers: [IncidenciasController],
  providers: [IncidenciasService],
  exports: [TypeOrmModule],
})
export class IncidenciasModule {}
