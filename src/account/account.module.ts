import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth/auth.module';
import { JwtStrategy } from 'src/auth/passportStrategies/Jwt.strategy';
import { AccountController } from './account.controller';
import { accountProviders } from './account.provider';
import { AccountService } from './account.service';

@Module({
  imports: [forwardRef(()=> AppModule),PassportModule],
  controllers: [AccountController],
  providers: [AccountService,JwtService,...accountProviders,JwtStrategy],
  exports:[AccountService]
})
export class AccountModule {}