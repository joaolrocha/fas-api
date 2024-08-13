import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find({ relations: ['responsaveis'] });
  }

  findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({
      where: { id },
      relations: ['responsaveis'],
    });
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientRepository.update(id, updateClientDto);
    return this.clientRepository.findOne({
      where: { id },
      relations: ['responsaveis'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
