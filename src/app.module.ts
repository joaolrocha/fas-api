import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'br622.hostgator.com.br',  // substitua pelo host do seu banco
      port: 3306,         // substitua pela porta do seu banco
      username: 'fassol82_fas_portal', // substitua pelo usuário do banco
      password: 'Fas@2024', // substitua pela senha do banco
      database: 'fassol82_fas_portal', // substitua pelo nome do banco
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // use com cuidado em produção; pode criar/migrar tabelas automaticamente
    }),
  ],
})
export class AppModule {}
