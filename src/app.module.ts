import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { AuthService } from './auth/auth/auth.service';
import { LocalStrategy } from './auth/passportStrategies/Local.strategy';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders, AppService,AuthService],
  exports:[...databaseProviders],
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env'],
      isGlobal: true
    }),
    AccountModule,AuthModule,JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
