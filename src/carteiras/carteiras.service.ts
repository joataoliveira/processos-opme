import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { Carteira } from './entities/carteira.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CarteirasService {
  constructor(@InjectRepository(Carteira) private repository:Repository<Carteira>){}

  async create(createCarteiraDto: CreateCarteiraDto) {
    let dado = await this.repository.save(createCarteiraDto);
    return this.findOne((await dado).id)
  }
  
  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number){
    const dado = await this.repository.findOneByOrFail( {id} );
    if (!dado){
        throw Error(`Mensagem com ID '${id}' não localizada`)
    }
    return dado;
  }

  async update(id: number, updateCarteiraDto: UpdateCarteiraDto) {
    const dado = await this.repository.findOneByOrFail({id});
    if (!dado) {
     throw Error(`Mensagem com ID '${id}' não localizada`)
    }

    let carteira = await this.repository.create(updateCarteiraDto);
    await this.repository.update({id},carteira);
    return await this.repository.findOneByOrFail({id})
  }

  async remove(id: number) {
    await this.repository.softDelete({id}); 
    
  }
}
