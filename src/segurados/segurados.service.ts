import { Injectable,Inject } from '@nestjs/common';
import { CreateSeguradoDto } from './dto/create-segurado.dto';
import { UpdateSeguradoDto } from './dto/update-segurado.dto';
import { Segurado } from './entities/segurado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarteirasService } from 'src/carteiras/carteiras.service';

@Injectable()
export class SeguradosService {
  constructor(@InjectRepository(Segurado) private repository:Repository<Segurado>){}
  
  @Inject(CarteirasService)
  private readonly carteiraService: CarteirasService;
  
  async create(createSeguradoDto: CreateSeguradoDto) {
    let dado = await this.repository.save(createSeguradoDto);
    return this.findOne((await dado).id);
  }

  async findAll() {
    return await this.repository.find({relations:{carteira:true}});
  }

  async findOne(id: number){
    const dado = await this.repository.find({relations:{carteira:true},where:{id}});
    //const dado = await this.repository.find({where:{id}});

    if (!dado){
        throw Error(`Segurado com ID '${id}' não localizado`)
    }
    return dado;
  }

  async update(id: number, updateSeguradoDto: UpdateSeguradoDto) {
    const dado = await this.repository.findOneByOrFail({id});
    if (!dado) {
     throw Error(`Segurado com ID '${id}' não localizado`)
    }

    let segurado = await this.repository.create(updateSeguradoDto);

    if (updateSeguradoDto.carteira){
      console.log(updateSeguradoDto.carteira);
      //let carteira = this.carteiraService.findOne(43);
      let carteira = this.carteiraService.findCarteira(updateSeguradoDto.carteira.carteira);
      console.log((await carteira));
      segurado.carteira = (await carteira);
    }
    

    await this.repository.update({id},segurado);
    //return await this.repository.findOneByOrFail({id});
    return await this.findOne(id);
  }

  async remove(id: number) {
    //await this.repository.softDelete({id});
    const dado = await this.findOne(id);
    await this.repository.softRemove(dado);
  }
}
