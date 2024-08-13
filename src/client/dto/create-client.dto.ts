import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponsavelDto } from './responsavel.dto';

export class CreateClientDto {

  @IsString()
  // @IsNotEmpty()
  cnpj: string;

  @IsString()
  // @IsNotEmpty()
  razaoSocial: string;

  @IsString()
  @IsNotEmpty()
  nomeFantasia: string;

  @IsString()
  // @IsNotEmpty()
  cep: string;

  @IsString()
  // @IsNotEmpty()
  endereco: string;

  @IsString()
  complemento?: string;

  @IsString()
  // @IsNotEmpty()
  numeroEmpresarial: string;

  @IsString()
  // @IsNotEmpty()
  bairro: string;

  @IsString()
  // @IsNotEmpty()
  cidade: string;

  @IsString()
  // @IsNotEmpty()
  estado: string;

  @IsString()
  // @IsNotEmpty()
  telefone: string;

  @IsString()
  // @IsNotEmpty()
  celular: string;

  @IsString()
  // @IsNotEmpty()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsavelDto)
  responsaveis: ResponsavelDto[];
}
