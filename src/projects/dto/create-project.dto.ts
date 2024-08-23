import { IsNotEmpty, IsString, IsOptional, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { TipoProjeto } from '../projects.entity';


export class CreateProjetoDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  codigoNomeCliente: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsUUID()
  @IsOptional()
  gerenteId?: string;

  @IsNotEmpty()
  @IsEnum(TipoProjeto)
  tipoProjeto: TipoProjeto;

  @IsNumber()
  @IsOptional()
  valorHora?: number;

  @IsNumber()
  @IsOptional()
  valorTotal?: number;

  @IsNumber()
  @IsOptional()
  totalHoras?: number;

  @IsNotEmpty()
  @IsString()
  numeroProposta: string;

  @IsNotEmpty()
  @IsString()
  nomeResponsavelCliente: string;

  @IsNotEmpty()
  @IsString()
  emailResponsavelCliente: string;

  @IsNotEmpty()
  @IsString()
  telefoneResponsavelCliente: string;

  @IsNotEmpty()
  @IsNumber()
  dataInicio: number;

  @IsOptional()
  @IsNumber()
  dataTermino?: number;

  @IsOptional()
  @IsString()
  justificativaAlteracaoDataTermino?: string;
}
