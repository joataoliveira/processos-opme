import { Module } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { ProcessosController } from './processos.controller';
import { Processo } from './entities/processo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Processo])],
  controllers: [ProcessosController],
  providers: [ProcessosService]
})
export class ProcessosModule {}
