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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { conectionVariables } from './auth/constants';
import { Users } from './users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: conectionVariables.DATABASE_HOST,
    port: conectionVariables.DATABASE_PORT,
    username: conectionVariables.DATABASE_USER,
    password: conectionVariables.DATABASE_PASSWORD,
    database: conectionVariables.DATABASE_NAME,
    entities: [Segurado,Processo,Carteira,Iten, Users],
    synchronize: true,
  }),ProcessosModule, ItensModule, SeguradosModule, CarteirasModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,  
              {
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
              }
              ],
})
export class AppModule {}
