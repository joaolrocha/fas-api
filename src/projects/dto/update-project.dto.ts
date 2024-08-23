import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-project.dto';


export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
