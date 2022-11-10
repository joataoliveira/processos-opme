import { Module } from '@nestjs/common';
import { SeguradosService } from './segurados.service';
import { SeguradosController } from './segurados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segurado } from './entities/segurado.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Segurado])], 
  controllers: [SeguradosController],
  providers: [SeguradosService]
})
export class SeguradosModule {}
