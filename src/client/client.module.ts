import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { Responsavel } from './responsavel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Responsavel])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
