import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultor } from './consultor.entity';
import { ConsultorService } from './consultor.service';
import { ConsultorController } from './consultor.controller';
import { CnpjModule } from 'src/common/modules/cpnj.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consultor]), CnpjModule],
  controllers: [ConsultorController],
  providers: [ConsultorService],
})
export class ConsultorModule {}
