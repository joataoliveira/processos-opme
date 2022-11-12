import { Carteira } from "src/carteiras/entities/carteira.entity";
import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Column, Entity, JoinColumn, OneToOne, } from "typeorm";

@Entity()
export class Segurado extends AbstractEntity {

    @Column()
    nomeSegurado: String;

    @Column('timestamp')
    dataNascimento?: Date;

    @OneToOne(() => Carteira,(carteira)=>carteira.segurado, {cascade: ["insert", "update","soft-remove"]})
    @JoinColumn()
    carteira: Carteira;
    segurado: Promise<Carteira>;
}
