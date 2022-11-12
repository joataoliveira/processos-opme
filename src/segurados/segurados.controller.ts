import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { SeguradosService } from './segurados.service';
import { CreateSeguradoDto } from './dto/create-segurado.dto';
import { UpdateSeguradoDto } from './dto/update-segurado.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('segurados')
@UseInterceptors(ClassSerializerInterceptor)
export class SeguradosController {
  constructor(private readonly seguradosService: SeguradosService) {}

  @Post()
  async create(@Body() createSeguradoDto: CreateSeguradoDto) {
    return await this.seguradosService.create(createSeguradoDto);
  }

  @Get()
  async findAll() {
    return await this.seguradosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seguradosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSeguradoDto: UpdateSeguradoDto) {
    return await this.seguradosService.update(+id, updateSeguradoDto);
  }

  @Delete(':id')
   async remove(@Param('id') id: string) {
    await this.seguradosService.remove(+id);
  }
}
