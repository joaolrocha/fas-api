import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CnpjService } from '../service/cnpj.service';
import { CnpjController } from '../controllers/cnpj.controller';

@Module({
  imports: [HttpModule],
  controllers: [CnpjController],
  providers: [CnpjService],
  exports: [CnpjService], // Exporta o serviço para que outros módulos possam utilizá-lo
})
export class CnpjModule {}
