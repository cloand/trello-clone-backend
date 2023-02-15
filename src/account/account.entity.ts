import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id:Number
    default:0

    @Column()
    name:String

    @Column()
    bio:String = ''

    @Column()
    phone:String = ''

    @Column({unique:true})
    email:String

    @Column()
    password:String = ''

    @Column()
    image:String 
}