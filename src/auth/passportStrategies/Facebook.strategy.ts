import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-facebook"

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy,'facebook'){
    constructor(){
        super({
            clientID: '851319402798489',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '993f59463e904d26150ed3db774f9d76',
            callbackURL: process.env.SOCIAL_CALLBACK_URL || 'http://localhost:5000/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
            scope:['email']
        })
    }

    async validate(
        _accessToken:String,
        _refreshToken:String,
        profile:any,
        done: (err:any,user:any,info?:any) => void
    ):Promise<any>{
        const {id,name,emails,photos} = profile

        const user = {
            provider: 'facebook',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
          };
      
          done(null, user);
    }
}