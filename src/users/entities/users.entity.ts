import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Column, Entity } from "typeorm";


@Entity()
export class Users extends AbstractEntity {    
    
    @Column({ length: 30 })
    username: String;

    @Column()
    password: String;

}