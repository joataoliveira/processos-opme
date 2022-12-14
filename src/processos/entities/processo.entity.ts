import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Iten } from "src/itens/entities/iten.entity";
import { Segurado } from "src/segurados/entities/segurado.entity";
import { Column, Entity,JoinColumn,JoinTable,ManyToMany,OneToMany, OneToOne  } from "typeorm";

@Entity()
export class Processo extends AbstractEntity{

    @OneToOne(()=>Segurado,{cascade: ["insert", "update"]})
    @JoinColumn()    
    segurado :Segurado;

    @Column('timestamp')
    dataProcesso?: Date;

    @Column()
    seqHospital :number;

    @Column()
    crmMedico :number;

    @ManyToMany(() => Iten, {cascade: ["insert", "update","soft-remove"]})
    @JoinTable()
    itens: Iten[];

   // @ManyToMany(() => Iten, (itens) => itens.processo, {cascade: true})
   // @JoinTable()
   // itens: Iten[];
}