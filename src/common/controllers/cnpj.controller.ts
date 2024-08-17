import { Controller, Get, Query } from '@nestjs/common';
import { CnpjService } from '../service/cnpj.service';


@Controller('cnpj')
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) {}

  @Get('buscar')
  async buscarCnpj(@Query('cnpj') cnpj: string) {
    return this.cnpjService.fetchCnpjData(cnpj);
  }
}
