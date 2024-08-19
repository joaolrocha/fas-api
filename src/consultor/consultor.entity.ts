import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Entity('consultores')
export class Consultor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCompleto: string;

  @Column({ type: 'timestamp' })
  dataNascimento: number;

  @Column('json')
  address: {
    enderecoResidencial: string;
    numeroResidencial: string;
    complementoEndereco?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column('json')
  addressPj: {
    cepEmpresarial: string;
    enderecoEmpresarial: string;
    complementoEmpresarial?: string;
    numeroEmpresarial: string;
    bairroEmpresarial: string;
    cidadeEmpresarial: string;
    estadoEmpresarial: string;
  };

  @Column()
  telefone: string;

  @Column()
  celular: string;

  @Column()
  emailParticular: string;

  // Dados Totvs
  @Column({ type: 'boolean', default: false })
  vinculadoTotvs: boolean;

  @Column({ nullable: true })
  codigoT: string;

  @Column({ nullable: true })
  emailTotvs: string;

  @Column({ select: false }) // A senha não será selecionada por padrão
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
