import { Injectable } from '@nestjs/common';
import { CreateSeguradoDto } from './dto/create-segurado.dto';
import { UpdateSeguradoDto } from './dto/update-segurado.dto';
import { Segurado } from './entities/segurado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';

@Injectable()
export class SeguradosService {
  constructor(@InjectRepository(Segurado) private repository:Repository<Segurado>){}

  async create(createSeguradoDto: CreateSeguradoDto) {
    let dado = await this.repository.save(createSeguradoDto);
    return this.findOne((await dado).id);
  }

  async findAll() {
    return await this.repository.find({relations:{carteira:true}});
  }

  async findOne(id: number){
    const dado = await this.repository.find({relations:{carteira:true},where:{id}});

    if (!dado){
        throw Error(`Mensagem com ID '${id}' não localizada`)
    }
    return dado;
  }

  async update(id: number, updateSeguradoDto: UpdateSeguradoDto) {
    const dado = await this.repository.findOneByOrFail({id});
    if (!dado) {
     throw Error(`Mensagem com ID '${id}' não localizada`)
    }

    let segurado = await this.repository.create(updateSeguradoDto);

    if (updateSeguradoDto.carteira){
      console.log(updateSeguradoDto.carteira);
      this.repository.find

    }


    await this.repository.update({id},segurado);
    return await this.repository.findOneByOrFail({id});
  }

  async remove(id: number) {
    //await this.repository.softDelete({id});
    const dado = await this.findOne(id);
    await this.repository.softRemove(dado);
  }
}
