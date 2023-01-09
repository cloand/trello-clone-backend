import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

export class GoogleStrategy extends  PassportStrategy(Strategy,'google'){
    constructor() {
        super({
            clientID: '637388326243-4at80th2ca2a3616um7l73sm8rqlgrq8.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
            callbackURL: process.env.SOCIAL_CALLBACK_URL || 'http://localhost:5000/auth/google/callback',
            scope: ['profile', 'email'],
        })
    }

    async validate(
        _accessToken:String,
        _refreshToken:String,
        profile:any,
        done: VerifyCallback
    ):Promise<any>{
        const {id,name,emails,photos} = profile

        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
          };
      
          done(null, user);
    }
}