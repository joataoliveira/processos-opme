import { Controller, Get, Post, Body, Patch, Param, Delete,ClassSerializerInterceptor,UseInterceptors, NotFoundException} from '@nestjs/common';
import { CarteirasService } from './carteiras.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';


@Controller('carteiras')
@UseInterceptors(ClassSerializerInterceptor)
export class CarteirasController {
  constructor(private readonly carteirasService: CarteirasService) {}

  @Post()
  async create(@Body() createCarteiraDto: CreateCarteiraDto) {
    return await this.carteirasService.create(createCarteiraDto);
  }

  @Get()
  async findAll() {
    return await this.carteirasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let dado;
    dado = await this.carteirasService.findOne(+id).catch((e) => { throw new NotFoundException(e.message) });
    return dado;
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarteiraDto: UpdateCarteiraDto) {
    return await this.carteirasService.update(+id, updateCarteiraDto).catch((e) => { throw new NotFoundException(e.message) });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.carteirasService.remove(+id);
  }
}
