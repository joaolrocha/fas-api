import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Responsavel } from './responsavel.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoSequencial: string;

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  numeroEmpresarial: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  telefone: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @OneToMany(() => Responsavel, responsavel => responsavel.client, { cascade: true })
  responsaveis: Responsavel[];
}
