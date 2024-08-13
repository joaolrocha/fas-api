import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const client = this.clientRepository.create(createClientDto);
      console.log(client)
      const savedClient = await this.clientRepository.save(client);
      this.logger.log(`Client created with ID: ${savedClient.nomeFantasia}`);
      return savedClient;
    } catch (error) {
      this.logger.error('Failed to create client', error.stack);
      throw new Error('Failed to create client');
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.clientRepository.find({ relations: ['responsaveis'] });
      this.logger.log(`Retrieved ${clients.length} clients`);
      return clients;
    } catch (error) {
      this.logger.error('Failed to retrieve clients', error.stack);
      throw new Error('Failed to retrieve clients');
    }
  }

  async findOne(id: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({ where: { id }, relations: ['responsaveis'] });
      if (client) {
        this.logger.log(`Client found with ID: ${id}`);
        return client;
      } else {
        this.logger.warn(`Client with ID ${id} not found`);
        throw new Error('Client not found');
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve client with ID: ${id}`, error.stack);
      throw new Error('Failed to retrieve client');
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      await this.clientRepository.update(id, updateClientDto);
      const updatedClient = await this.clientRepository.findOne({ where: { id }, relations: ['responsaveis'] });
      if (updatedClient) {
        this.logger.log(`Client updated with ID: ${id}`);
        return updatedClient;
      } else {
        this.logger.warn(`Client with ID ${id} not found for update`);
        throw new Error('Client not found');
      }
    } catch (error) {
      this.logger.error(`Failed to update client with ID: ${id}`, error.stack);
      throw new Error('Failed to update client');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const deleteResult = await this.clientRepository.delete(id);
      if (deleteResult.affected > 0) {
        this.logger.log(`Client deleted with ID: ${id}`);
      } else {
        this.logger.warn(`Client with ID ${id} not found for deletion`);
        throw new Error('Client not found');
      }
    } catch (error) {
      this.logger.error(`Failed to delete client with ID: ${id}`, error.stack);
      throw new Error('Failed to delete client');
    }
  }
}
