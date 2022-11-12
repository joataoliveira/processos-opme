import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
import { Processo } from './entities/processo.entity';
import { SeguradosService } from 'src/segurados/segurados.service';

@Injectable()
export class ProcessosService {
  constructor(@InjectRepository(Processo) private repository:Repository<Processo>){}

  @Inject(SeguradosService)
  private readonly seguradoService: SeguradosService;
  

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

  async update(id: number, updateProcessoDto: UpdateProcessoDto) {
    const dado = await this.repository.findOneByOrFail({id});
    if (!dado) {
     throw Error(`Mensagem com ID '${id}' não localizada`)
    }

    let processo = await this.repository.create(updateProcessoDto);

    if(updateProcessoDto.segurado){
      console.log(updateProcessoDto.segurado);



    }

    await this.repository.update({id},processo);
    return await this.repository.findOneByOrFail({id})
  }

  async remove(id: number) {
    const dado = await this.findOne(id);
    await this.repository.softRemove(dado);
  }
}
