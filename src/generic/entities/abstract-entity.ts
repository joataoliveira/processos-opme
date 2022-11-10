import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

export abstract class AbstractEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Exclude()
    @CreateDateColumn()
    createdAt: Date

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date
}