import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  enderecoResidencial: string;

  @IsString()
  @IsNotEmpty()
  numeroResidencial: string;

  @IsString()
  @IsOptional()
  complementoEndereco?: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  cep: string;
}

class AddressPjDto {
  @IsString()
  @IsNotEmpty()
  cepEmpresarial: string;

  @IsString()
  @IsNotEmpty()
  enderecoEmpresarial: string;

  @IsString()
  @IsOptional()
  complementoEmpresarial?: string;

  @IsString()
  @IsNotEmpty()
  numeroEmpresarial: string;

  @IsString()
  @IsNotEmpty()
  bairroEmpresarial: string;

  @IsString()
  @IsNotEmpty()
  cidadeEmpresarial: string;

  @IsString()
  @IsNotEmpty()
  estadoEmpresarial: string;
}

export class CreateConsultorDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsNumber()
  @IsNotEmpty()
  dataNascimento: number;  // Agora é um número representando o timestamp

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  razaoSocial: string;

  @IsString()
  @IsNotEmpty()
  nomeFantasia: string;

  @ValidateNested()
  @Type(() => AddressPjDto)
  addressPj: AddressPjDto;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  celular: string;

  @IsString()
  @IsNotEmpty()
  emailParticular: string;

  @IsBoolean()
  @IsNotEmpty()
  vinculadoTotvs: boolean;

  @IsString()
  @IsOptional()
  codigoT?: string;

  @IsString()
  @IsOptional()
  emailTotvs?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
