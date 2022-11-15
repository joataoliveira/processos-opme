import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItenDto } from './dto/create-iten.dto';
import { UpdateItenDto } from './dto/update-iten.dto';
import { Iten } from './entities/iten.entity';

@Injectable()
export class ItensService {
  constructor(@InjectRepository(Iten) private repository:Repository<Iten>){}

  async create(createItenDto: CreateItenDto) {
    let dado = await this.repository.save(createItenDto);
    return this.findOne((await dado).id)
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const dado = await this.repository.findOneByOrFail( {id} );
    if (!dado){
        throw Error(`Mensagem com ID '${id}' não localizada`)
    }
    return dado;
  }

  async update(id: number, updateItenDto: UpdateItenDto) {
   const dado = await this.repository.findOneByOrFail({id});
    if (!dado) {
     throw Error(`Mensagem com ID '${id}' não localizada`)
    }
    return await this.repository.findOneByOrFail({id})
  }

  async remove(id: number) {
    await this.repository.softDelete({id}); 
  }

  async findCodigo(codigo: number){
    return await this.repository
    .createQueryBuilder("iten")
    .where("iten.codMatMed = :x",{x:codigo})
    .getOne();
  }


}
