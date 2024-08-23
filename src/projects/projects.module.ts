import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsultorModule } from '../consultor/consultor.module';
import { Projeto } from './projects.entity';
import { ProjetoController } from './projects.controller';
import { ProjetoService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projeto]),
    ConsultorModule,
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
})
export class ProjetoModule {}
