import { Module } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { ProcessosController } from './processos.controller';
import { Processo } from './entities/processo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguradosModule } from 'src/segurados/segurados.module';
import { ItensModule } from 'src/itens/itens.module';
import { ItensService } from 'src/itens/itens.service';

@Module({
  imports:[TypeOrmModule.forFeature([Processo]), SeguradosModule, ItensModule],
  controllers: [ProcessosController],
  providers: [ProcessosService],
  exports:[ProcessosService] //add
})
export class ProcessosModule {}
