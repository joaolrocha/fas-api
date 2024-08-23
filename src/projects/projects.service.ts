import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto } from './projects.entity';
import { CreateProjetoDto } from './dto/create-project.dto';


@Injectable()
export class ProjetoService {
  private readonly logger = new Logger(ProjetoService.name);

  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,
  ) {}

  async createProjeto(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    try {
      const projeto = this.projetoRepository.create(createProjetoDto);
      const savedProjeto = await this.projetoRepository.save(projeto);
      this.logger.log(`Projeto criado com sucesso: ${savedProjeto.id}`);
      return savedProjeto;
    } catch (error) {
      this.logger.error('Erro ao criar projeto', error.stack);
      throw new InternalServerErrorException('Erro ao criar projeto');
    }
  }

  async findAll(): Promise<Projeto[]> {
    try {
      const projetos = await this.projetoRepository.find();
      this.logger.log(`Foram encontrados ${projetos.length} projetos`);
      return projetos;
    } catch (error) {
      this.logger.error('Erro ao buscar projetos', error.stack);
      throw new InternalServerErrorException('Erro ao buscar projetos');
    }
  }

  async findOne(id: string): Promise<Projeto> {
    try {
      const projeto = await this.projetoRepository.findOne({ where: { id } });
      if (!projeto) {
        this.logger.warn(`Projeto com ID ${id} não encontrado`);
        throw new NotFoundException('Projeto não encontrado');
      }
      this.logger.log(`Projeto encontrado: ${projeto.id}`);
      return projeto;
    } catch (error) {
      this.logger.error(`Erro ao buscar projeto com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar projeto');
    }
  }

  async updateProjeto(id: string, updateProjetoDto: Partial<CreateProjetoDto>): Promise<Projeto> {
    try {
      await this.projetoRepository.update(id, updateProjetoDto);
      const updatedProjeto = await this.findOne(id);
      this.logger.log(`Projeto atualizado com sucesso: ${updatedProjeto.id}`);
      return updatedProjeto;
    } catch (error) {
      this.logger.error(`Erro ao atualizar projeto com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar projeto');
    }
  }

  async deleteProjeto(id: string): Promise<void> {
    try {
      const result = await this.projetoRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`Projeto com ID ${id} não encontrado para exclusão`);
        throw new NotFoundException('Projeto não encontrado');
      }
      this.logger.log(`Projeto com ID ${id} excluído com sucesso`);
    } catch (error) {
      this.logger.error(`Erro ao excluir projeto com ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao excluir projeto');
    }
  }
}
