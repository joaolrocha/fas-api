import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('responsaveis')
export class Responsavel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column({ default: false })
  isPrincipal: boolean;

  @ManyToOne(() => Client, client => client.responsaveis)
  client: Client;
}
