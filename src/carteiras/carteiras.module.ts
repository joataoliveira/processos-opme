import { Module } from '@nestjs/common';
import { CarteirasService } from './carteiras.service';
import { CarteirasController } from './carteiras.controller';
import { Carteira } from './entities/carteira.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Carteira])],
  controllers: [CarteirasController],
  providers: [CarteirasService]
})
export class CarteirasModule {}
