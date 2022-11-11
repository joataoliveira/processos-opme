import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
import { Processo } from './entities/processo.entity';

@Injectable()
export class ProcessosService {
  constructor(@InjectRepository(Processo) private repository:Repository<Processo>){}

  async create(createProcessoDto: CreateProcessoDto) {
    let dado = await this.repository.save(createProcessoDto);
    return this.findOne((await dado).id);
  }

  async findAll() {
    return await this.repository.find({relations:{segurado:true,itens:true}});
  }

  async findOne(id: number){
    const dado = await this.repository.find({relations:{segurado:true,itens:true},where:{id}});

    if (!dado){
        throw Error(`Mensagem com ID '${id}' não localizada`)
    }
    return dado;
  }

  update(id: number, updateProcessoDto: UpdateProcessoDto) {
    return `This action updates a #${id} processo`;
  }

  async remove(id: number) {
    const dado = await this.findOne(id);
    await this.repository.softRemove(dado);
  }
}
