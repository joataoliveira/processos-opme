import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessosModule } from './processos/processos.module';
import { ItensModule } from './itens/itens.module';
import { SeguradosModule } from './segurados/segurados.module';
import { CarteirasModule } from './carteiras/carteiras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segurado } from './segurados/entities/segurado.entity';
import { Processo } from './processos/entities/processo.entity';
import { Carteira } from './carteiras/entities/carteira.entity';
import { Iten } from './itens/entities/iten.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'masterkey',
    database: 'OPME',
    entities: [Segurado,Processo,Carteira,Iten],
    synchronize: true,
  }),ProcessosModule, ItensModule, SeguradosModule, CarteirasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
