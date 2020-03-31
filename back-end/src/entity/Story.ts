import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";

@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128})
    @Length(1, 100)
    @IsNotEmpty()
    summary: string;

    @Column({length: 64})
    type: string;

    @Column({length: 32})
    complexity: string;

    @Column()
    estimateHrs: number;

    @Column("double")
    cost: number;

    @Column("text")
    description: string;

    @Column({length: 32, nullable: true})
    status: string;
    
    @ManyToOne(type => User, user => user.stories)
    @JoinColumn({ name: "createdBy" })
    user:  User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
