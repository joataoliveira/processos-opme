import { Module } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { ProcessosController } from './processos.controller';
import { Processo } from './entities/processo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguradosModule } from 'src/segurados/segurados.module';

@Module({
  imports:[TypeOrmModule.forFeature([Processo]), SeguradosModule],
  controllers: [ProcessosController],
  providers: [ProcessosService]
})
export class ProcessosModule {}
