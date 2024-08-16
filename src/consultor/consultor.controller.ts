import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ConsultorService } from './consultor.service'
import { CreateConsultorDto } from './dto/create-consultor.dto';

@Controller('consultores')
export class ConsultorController {
  constructor(private readonly consultorService: ConsultorService) {}

  @Post()
  async create(@Body() createConsultorDto: CreateConsultorDto) {
    return this.consultorService.createConsultor(createConsultorDto);
  }

  @Get()
  async findAll() {
    return this.consultorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.consultorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateConsultorDto: Partial<CreateConsultorDto>) {
    return this.consultorService.updateConsultor(id, updateConsultorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.consultorService.deleteConsultor(id);
  }
}
