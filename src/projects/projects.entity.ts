import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Consultor } from '../consultor/consultor.entity';
import { v4 as uuidv4 } from 'uuid';

export enum TipoProjeto {
  ABERTO = 'Aberto',
  FECHADO = 'Fechado',
}

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @Column()
  codigo: string;

  @Column()
  codigoNomeCliente: string;

  @Column()
  titulo: string;

  @Column('text')
  descricao: string;

  @ManyToOne(() => Consultor, (consultor) => consultor.projetos, { nullable: true })
  gerente: Consultor;

  @Column({ type: 'enum', enum: TipoProjeto })
  tipoProjeto: TipoProjeto;

  @Column({ type: 'decimal', nullable: true })
  valorHora: number | null;

  @Column({ type: 'decimal', nullable: true })
  valorTotal: number | null;

  @Column({ nullable: true })
  totalHoras: number | null;

  @Column()
  numeroProposta: string;

  @Column()
  nomeResponsavelCliente: string;

  @Column()
  emailResponsavelCliente: string;

  @Column()
  telefoneResponsavelCliente: string;

  @Column({ type: 'bigint' })
  dataInicio: number;

  @Column({ type: 'bigint', nullable: true })
  dataTermino: number | null;

  @Column({ nullable: true })
  justificativaAlteracaoDataTermino: string | null;
}
