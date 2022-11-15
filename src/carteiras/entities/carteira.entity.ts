import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Column, Entity, Index, OneToOne } from "typeorm";
import { Expose } from "class-transformer"
import { Segurado } from "src/segurados/entities/segurado.entity";

@Entity()
export class Carteira extends AbstractEntity {

    @Expose()
    @Column()
    //@Index({ unique: true })
    @Index()
    carteira: string

    @Expose()
    @Column()
    viaCarteira: number;

    @OneToOne(() => Segurado, (segurado) => segurado.carteira) 
    segurado :Segurado

}
