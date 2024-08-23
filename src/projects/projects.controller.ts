import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ProjetoService } from './projects.service';
import { CreateProjetoDto } from './dto/create-project.dto';


@Controller('projetos')
export class ProjetoController {
  private readonly logger = new Logger(ProjetoController.name);

  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  async create(@Body() createProjetoDto: CreateProjetoDto) {
    this.logger.log('Recebendo requisição para criar projeto');
    return this.projetoService.createProjeto(createProjetoDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Recebendo requisição para listar todos os projetos');
    return this.projetoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Recebendo requisição para buscar projeto com ID: ${id}`);
    return this.projetoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjetoDto: CreateProjetoDto) {
    this.logger.log(`Recebendo requisição para atualizar projeto com ID: ${id}`);
    return this.projetoService.updateProjeto(id, updateProjetoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Recebendo requisição para excluir projeto com ID: ${id}`);
    return this.projetoService.deleteProjeto(id);
  }
}
