import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
import { Processo } from './entities/processo.entity';
import { SeguradosService } from 'src/segurados/segurados.service';
import { ItensService } from 'src/itens/itens.service';
import { Iten } from 'src/itens/entities/iten.entity';

@Injectable()
export class ProcessosService {
  constructor(@InjectRepository(Processo) private repository:Repository<Processo> ){}

  @Inject(SeguradosService)
  private readonly seguradoService: SeguradosService;

  @Inject(ItensService)
  private readonly itensService: ItensService;

  async create(createProcessoDto: CreateProcessoDto) {
    //console.log(await this.itensService.findCodigo(2000));
    //let dto = createProcessoDto;
    //let itensAtualizados[] = this.verificarItens(createProcessoDto.itens);
    //dto.itens = [this.verificarItens(createProcessoDto.itens)];
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
    let itens :Array<Iten> = [];

    /*let dado = await this.repository
    .createQueryBuilder("processo")
    .leftJoinAndSelect("processo.itens", "itens")
    .where("processo.id = :id", { id: id })
    .getOne();*/

    if (!dado) {
     throw Error(`Mensagem com ID '${id}' não localizada`)
    }

    if(updateProcessoDto.itens){
      this.atualizarItens(id,updateProcessoDto.itens)
    }

    await this.repository
      .createQueryBuilder()
      .update("processo")
      .set({crmMedico:updateProcessoDto.crmMedico,seqHospital:updateProcessoDto.seqHospital})
      .where("processo.id = :id", { id: id })
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number) {
    const dado = await this.findOne(id);
    await this.repository.softRemove(dado);
  }

  async atualizarItens(id:number,itens: Iten[]){
    //console.log(itens)
    let itensAux :Array<Iten> = [];
    let processoAux = await this.repository.createQueryBuilder("processo").where("processo.id = :x",{x:id}).getOne();
    //let processoAux = await this.findOne(id);
    //console.log("--------------")
    //console.log(processoAux);

    for(let item of itens){
      let itenEncontrado = await this.itensService.findCodigo(item.codMatMed);
      if(itenEncontrado){
        itensAux.push(itenEncontrado);
      }
      processoAux.itens = itensAux;
      this.repository.save(processoAux);
    }
  }


  async verificarItens(itens: Iten[]){
    let itensAux = itens;
    console.log(itensAux);
    const contexto = this;
    
    /*await itensAux.forEach(async function(valor,Index){
      let itenEncontrado = await contexto.itensService.findCodigo(valor.codMatMed);
      if(itenEncontrado){
        console.log(`Entrou = ${itenEncontrado.codMatMed}`)
        console.log(Index);
        itensAux.splice(Index,1);
      }
    })*/

    for(let item of itensAux){
      let itenEncontrado = await contexto.itensService.findCodigo(item.codMatMed);
      if(itenEncontrado){
        let i = itensAux.indexOf(item);
        itensAux.splice(i,1);
      }
    }
    await console.log(itensAux);
    return itensAux;
  }



}


