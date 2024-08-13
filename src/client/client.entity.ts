import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Responsavel } from './responsavel.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4(); 

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