import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Incidencia } from 'src/incidencias/entities/incidencia.entity'

@Entity('seguimientos')
export class Seguimiento {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  incidencia_id: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  comentario: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  estado_anterior: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  estado_nuevo: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fecha: Date

  @ManyToOne(() => Incidencia, (incidencia) => incidencia.seguimientos)
  @JoinColumn({ name: 'incidencia_id' })
  incidencia: Incidencia
}
