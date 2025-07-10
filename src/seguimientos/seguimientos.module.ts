import { Module } from '@nestjs/common'
import { SeguimientosService } from './seguimientos.service'
import { SeguimientosController } from './seguimientos.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Seguimiento } from './entities/seguimiento.entity'
import { Incidencia } from '../incidencias/entities/incidencia.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Seguimiento, Incidencia])],
  controllers: [SeguimientosController],
  providers: [SeguimientosService],
})
export class SeguimientosModule {}
