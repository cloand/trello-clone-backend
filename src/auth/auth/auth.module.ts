import {  Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from 'src/account/account.module';
import { LocalAuthGuard } from 'src/gaurd/local.guard';
import { FacebookStrategy } from '../passportStrategies/Facebook.strategy';
import { GithubStrategy } from '../passportStrategies/Github.strategy';
import { GoogleStrategy } from '../passportStrategies/Google.strategy';
import { JwtStrategy } from '../passportStrategies/Jwt.strategy';
import { LocalStrategy } from '../passportStrategies/Local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[AccountModule,
            PassportModule,
          ],
  controllers: [AuthController],
  providers: [AuthService,JwtService,LocalStrategy,JwtStrategy,GoogleStrategy,FacebookStrategy,GithubStrategy],
})
export class AuthModule {}
