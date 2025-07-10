import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { typeOrmConfig } from './config/typeorm'
import { IncidenciasModule } from './incidencias/incidencias.module'
import { DepartamentosModule } from './departamentos/departamentos.module'
import { SeguimientosModule } from './seguimientos/seguimientos.module'
import { Incidencia } from './incidencias/entities/incidencia.entity'
import { Departamento } from './departamentos/entities/departamento.entity'
import { Seguimiento } from './seguimientos/entities/seguimiento.entity'
import { IncidenciaPendienteView } from './incidencias/pendientes/entity'
import { IncidenciasPorDepartamentoView } from './incidencias/porDepartamento/entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([
      Incidencia,
      Departamento,
      Seguimiento,
      IncidenciaPendienteView,
      IncidenciasPorDepartamentoView,
    ]),
    IncidenciasModule,
    DepartamentosModule,
    SeguimientosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
