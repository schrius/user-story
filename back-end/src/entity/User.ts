import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Story } from './Story';

export enum UserRole {
    ADMIN = "Admin",
    USER = "User",
    QA = "QA"
}
@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64})
    @Length(4, 64)
    @IsNotEmpty()
    username: string;

    @Column({length: 64})
    @Length(4, 64)
    password: string;

    @Column({length: 64})
    firstName: string;

    @Column({length: 64})
    lastName: string;

    @Column({
        type: "set",
        enum: UserRole,
        default: [UserRole.USER]
    })
    @IsNotEmpty()
    roles: UserRole[]

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    validatePassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
