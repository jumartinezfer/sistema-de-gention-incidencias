import { ViewEntity, ViewColumn } from 'typeorm'

@ViewEntity({ name: 'incidencias_pendientes_view' })
export class IncidenciaPendienteView {
  @ViewColumn()
  id: string

  @ViewColumn()
  titulo: string

  @ViewColumn()
  descripcion: string

  @ViewColumn()
  estado: string

  @ViewColumn()
  prioridad: string

  @ViewColumn()
  departamento: string

  @ViewColumn()
  ciudadano_email: string

  @ViewColumn()
  fecha_creacion: Date
}
