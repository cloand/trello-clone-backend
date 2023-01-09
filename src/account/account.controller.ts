import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import {  Response } from 'express';
import { JwtGuard } from 'src/gaurd/jwt.guard';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Get('getAllUser')
    getAll(){
        return this.accountService.getAll()
    }

    @Get('getUserInfo')
    @UseGuards(JwtGuard)
    async signIn(@Req() req, @Res() res: Response): Promise<void> {
        try{
            return await this.accountService.getUserData(req.user.email).then(user =>{
                user.id = null
                res.send(user)
            })
        }catch(err){
            res.send(err)
        }
    }

    @Post('editUserInfo')
    @UseGuards(JwtGuard)
    async editInfo(@Req() req, @Res() res: Response):Promise<void> {
        try{
            res.send(this.accountService.editUser(req.body))
        }catch(err){
            res.send({'error':err})
        }
    }
}
