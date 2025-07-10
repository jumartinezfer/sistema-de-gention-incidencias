import { ViewEntity, ViewColumn } from 'typeorm'
import { Incidencia } from '../entities/incidencia.entity'

@ViewEntity({ name: 'incidencias_por_departamento' })
export class IncidenciasPorDepartamentoView {
  @ViewColumn()
  departamento_id: string

  @ViewColumn()
  departamento: string

  @ViewColumn()
  incidencias: Incidencia[]

  @ViewColumn()
  total_incidencias: number

  @ViewColumn()
  pendientes: number

  @ViewColumn()
  resueltas: number
}
