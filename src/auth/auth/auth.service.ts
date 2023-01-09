import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwIfEmpty } from 'rxjs';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService,
        private readonly accountService:AccountService){}

    validateUser = async (email:string,password:string) : Promise<any>=> {
       try{
            return await this.accountService.findUser(email).then(
                res => {
                    if(res && res.password == password){
                        return true
                    }else{
                        return false
                    }
                }
            )
       }catch(err){
            return {'err' : err}
       }
    }

    validateSignUp = async (email:string):Promise<any> => {
        try{
            return await this.accountService.findUser(email)
        }catch(err){
            return {'error':err}
        }
    }
    
    signIn = (payload:object) => {
        try{
            const jwt_token =  this.jwtService.sign(payload,{secret:'secret'})
            return jwt_token
        }catch(err){
            return {'error':err}
        }
    }

    socialAuth = async (payload : any) => {
        try {
            const { email,name,picture} = payload
            return await this.validateSignUp(email).then(async isUserExist => {
                if (!isUserExist || isUserExist.error) await this.accountService.createUser({ 'email': email, 'password': '',picture:picture,name:name})
                const token = await this.signIn({ 'email': email })
                return token 
            })
        } catch (err) {
            return { 'error': err }
        }
    }


    signUp = (payload:object) => {
        try{
            
        }catch(err){

        }
    }
}
