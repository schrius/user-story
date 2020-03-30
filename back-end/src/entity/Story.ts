import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class User {

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

    @Column({length: 32})
    estimateHrs: string;

    @Column("double")
    cost: number;

    @Column("text")
    description: string;

    @Column({length: 32})
    status: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
