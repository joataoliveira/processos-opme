import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import { Iten } from './entities/iten.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Iten])],
  controllers: [ItensController],
  providers: [ItensService],
  exports:[ItensService] //add
})
export class ItensModule {}
