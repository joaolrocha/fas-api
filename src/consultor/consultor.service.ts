import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultor } from './consultor.entity';
import { CreateConsultorDto } from './dto/create-consultor.dto';

@Injectable()
export class ConsultorService {
  private readonly logger = new Logger(ConsultorService.name);

  constructor(
    @InjectRepository(Consultor)
    private readonly consultorRepository: Repository<Consultor>,
  ) {}

  async createConsultor(createConsultorDto: CreateConsultorDto): Promise<Consultor> {
    try {
      const consultor = this.consultorRepository.create(createConsultorDto);
      const savedConsultor = await this.consultorRepository.save(consultor);
      this.logger.log(`Consultor criado com sucesso: ${savedConsultor.id}`);
      return savedConsultor;
    } catch (error) {
      this.logger.error('Erro ao criar consultor', error.stack);
      throw new InternalServerErrorException('Erro ao criar consultor');
    }
  }

  async findAll(): Promise<Consultor[]> {
    try {
      const consultores = await this.consultorRepository.find();
      this.logger.log(`Foram encontrados ${consultores.length} consultores`);
      return consultores;
    } catch (error) {
      this.logger.error('Erro ao buscar consultores', error.stack);
      throw new InternalServerErrorException('Erro ao buscar consultores');
    }
  }

  async findOne(id: string): Promise<Consultor> {
    try {
      const consultor = await this.consultorRepository.findOne({ where: { id } });
      if (!consultor) {
        this.logger.warn(`Consultor com ID ${id} não encontrado`);
        throw new NotFoundException('Consultor não encontrado');
      }
      this.logger.log(`Consultor encontrado: ${consultor.id}`);
      return consultor;
    } catch (error) {
      this.logger.error(`Erro ao buscar consultor com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar consultor');
    }
  }

  async updateConsultor(id: string, updateConsultorDto: Partial<CreateConsultorDto>): Promise<Consultor> {
    try {
      await this.consultorRepository.update(id, updateConsultorDto);
      const updatedConsultor = await this.findOne(id);
      this.logger.log(`Consultor atualizado com sucesso: ${updatedConsultor.id}`);
      return updatedConsultor;
    } catch (error) {
      this.logger.error(`Erro ao atualizar consultor com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar consultor');
    }
  }

  async deleteConsultor(id: string): Promise<void> {
    try {
      const result = await this.consultorRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`Consultor com ID ${id} não encontrado para exclusão`);
        throw new NotFoundException('Consultor não encontrado');
      }
      this.logger.log(`Consultor com ID ${id} excluído com sucesso`);
    } catch (error) {
      this.logger.error(`Erro ao excluir consultor com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao excluir consultor');
    }
  }
  async findOneByEmail(email: string, includePassword = false): Promise<Consultor | undefined> {
    this.logger.log(`Procurando consultor com email: ${email}`);
    
    const queryBuilder = this.consultorRepository.createQueryBuilder('consultor');

    if (includePassword) {
      queryBuilder.addSelect('consultor.password'); // Certifique-se de que a senha está sendo selecionada
    }

    queryBuilder.where('consultor.emailFas = :email', { email });

    const consultor = await queryBuilder.getOne();

    if (consultor) {
      this.logger.log(`Consultor encontrado: ${consultor.nomeCompleto}`);
    } else {
      this.logger.warn(`Consultor com email ${email} não encontrado`);
    }

    return consultor;
  }
}
