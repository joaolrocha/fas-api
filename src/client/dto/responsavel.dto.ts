import { IsString, IsBoolean } from 'class-validator';

export class ResponsavelDto {
  @IsString()
  nome: string;

  @IsString()
  email: string;

  @IsString()
  telefone: string;

  @IsBoolean()
  isPrincipal: boolean;
}
