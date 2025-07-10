import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Seguimiento } from '../../seguimientos/entities/seguimiento.entity'
import { Incidencia } from 'src/incidencias/entities/incidencia.entity'

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nombre: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email_responsable: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  tiempo_respuesta_medio: number

  @OneToMany(() => Incidencia, (incidencia) => incidencia.departamento)
  incidencias: Incidencia[]
}
