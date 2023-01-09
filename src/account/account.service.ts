import { Inject, Injectable } from '@nestjs/common';
import {Repository } from 'typeorm';
import { User } from './account.entity';

@Injectable()
export class AccountService {
  constructor(@Inject('USER_REPOSITORY') private userRepository:Repository<User>) { }

  getAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findUser(email:string):Promise<any> {
    try{
      return await this.userRepository.createQueryBuilder('user').select(['user']).where("user.email = :name", { name: email }).getOneOrFail();
    }catch(err){
      return {'error' : err}
    }
  }

  async getUserData(email:string):Promise<any>{
    try{
      return await this.userRepository.createQueryBuilder('user').select(['user']).where("user.email = :name", { name: email }).getOneOrFail();
    }catch(err){
      return {'error':err}
    }
  }

  async createUser(payload):Promise<any>{
    const {email,password,picture,name} = payload
    const newUser = new User
    newUser.email = email
    newUser.password = password
    newUser.image = picture ? picture : 'insert your latest image'
    newUser.name = name ? name : 'enter your password'
    return await this.userRepository.createQueryBuilder('user').insert().into(User).values([
      newUser,
    ]).execute().then(res =>{
      return res
    })
  }

  async editUser(payload):Promise<any>{
    delete payload['id']
    try{
      return await this.userRepository.createQueryBuilder('user').update('user').set({...payload}).where("email = :email", { email: payload.email }).execute()
    }catch(err){
      return err
    }
  }

}
