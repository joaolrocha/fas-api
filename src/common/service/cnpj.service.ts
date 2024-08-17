import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CnpjService {
  constructor(private readonly httpService: HttpService) {}

  async fetchCnpjData(cnpj: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar dados do CNPJ: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

