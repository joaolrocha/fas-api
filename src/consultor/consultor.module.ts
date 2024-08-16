import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultor } from './consultor.entity';
import { ConsultorService } from './consultor.service';
import { ConsultorController } from './consultor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Consultor])],
  controllers: [ConsultorController],
  providers: [ConsultorService],
})
export class ConsultorModule {}
