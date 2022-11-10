
import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Iten } from "src/itens/entities/iten.entity";
import { Segurado } from "src/segurados/entities/segurado.entity";
import { Column, Entity,OneToMany  } from "typeorm";

@Entity()
export class Processo extends AbstractEntity{

    segurado :Segurado;

    @Column()
    dataProcesso?: Date;

    @Column()
    seqHospital :number;

    @Column()
    crmMedico :number;

    @OneToMany(() => Iten,(iten)=>iten.processo)
    itens: Iten[];
}