import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Departamento } from '../../departamentos/entities/departamento.entity'
import { Seguimiento } from 'src/seguimientos/entities/seguimiento.entity'

@Entity('incidencias')
export class Incidencia {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  titulo: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  descripcion: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  estado: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  prioridad: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  departamento_id: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  ciudadano_email: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fecha_creacion: Date

  @ManyToOne(() => Departamento, (departamento) => departamento.incidencias)
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento

  @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.incidencia)
  seguimientos: Seguimiento[]
}
