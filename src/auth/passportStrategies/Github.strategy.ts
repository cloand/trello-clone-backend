import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";

export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: '356b4d76ee8823d40162',
            clientSecret: process.env.GITHUB_APP_SECRET || '26d9fcd24d076f45fd874b002fdb8891b1f18ab3',
            callbackURL: process.env.SOCIAL_CALLBACK_URL || 'http://localhost:5000/auth/github/callback',
            scope: ['user:email'],
        })
    }

    async validate(
        _: undefined,
        __: undefined,
        profile:any,
        done: (err:any,user:any,info?:any) => void
    ){
        const {id,username,photos,emails} = profile

        const user = {
            provider: 'github',
            providerId: id,
            email: emails[0].value,
            name: username,
            picture: photos[0].value,
        };
        done(null, user);
    }
}