import { Controller, Get, Inject, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, response, Response } from 'express';
import { AccountService } from 'src/account/account.service';
import { FacebookAuthGuard } from 'src/gaurd/facebook.guard';
import { GitHubAuthGuard } from 'src/gaurd/github.guard';
import { GoogleAuthGuard } from 'src/gaurd/google.guard';
import { LocalAuthGuard } from 'src/gaurd/local.guard';
import { AuthService } from './auth.service';
import popupTools,{popupResponse} from 'popup-tools'


@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(AccountService) private readonly accountService: AccountService
    ) { }

    @Post('signIn/local')
    @UseGuards(LocalAuthGuard)
    async signIn(@Req() request: Request, @Res() response: Response) {
        try {
            const { username: email, password } = request.body
            const token = this.authService.signIn({ 'email': email })
            response.send({ 'token': token })
        } catch (err) {
            response.send({ 'error': err })
        }
    }

    @Post('signup/local')
    async signUp(@Req() request: Request, @Res() response: Response) {
        try {
            const { email, password } = request.body
            await this.authService.validateSignUp(email).then(async res => {
                if (res) {
                    response.send({ 'duplication': 'user already exist' })
                } else {
                    await this.accountService.createUser({ 'email': email, 'password': password }).then(res => response.send({ 'res': 'user added successully' }))
                }
            })
        } catch (err) {
            response.send({ 'error': err })
        }
    }

    @Get('OAuth/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() { }

    @Get('OAuth/facebook')
    @UseGuards(FacebookAuthGuard)
    async facebookAuth() { }

    @Get('OAuth/github')
    @UseGuards(GitHubAuthGuard)
    async gitHubAuth() { }
    
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleCallback(@Req() req, @Res() res: Response) {
        try {
            await this.authService.socialAuth(req.user).then(token => {
                res.set({ "content-type": "text/html; charset=utf-8" });
                res.end(popupResponse(token));
            })
        } catch (err) {
            res.send({ 'error': err })
        }
    }

    @Get('facebook/callback')
    @UseGuards(FacebookAuthGuard)
    async facebookCallback(@Req() req, @Res() res: Response) {
        try {
            await this.authService.socialAuth(req.user).then(token =>{
                res.set({ "content-type": "text/html; charset=utf-8" });
                res.end(popupResponse(token));
            })
        } catch (err) {
            res.send({ 'error': err })
        }
    }

    @Get('github/callback')
    @UseGuards(GitHubAuthGuard)
    async githubCallback(@Req() req, @Res() res: Response) {
        try {
            await this.authService.socialAuth(req.user).then(token =>{
                res.set({ "content-type": "text/html; charset=utf-8" });
                res.end(popupResponse(token));
            })
        } catch (err) {
            res.send({ 'error': err })
        }
    }

}
