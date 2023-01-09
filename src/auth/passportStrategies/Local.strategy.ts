import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password',
        })
    }

    async validate(email:string,password:string):Promise<any>{
        try{
            return await this.authService.validateUser(email,password)
        }catch(err){
            return err
        }
    }
}