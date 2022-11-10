import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Processo } from "src/processos/entities/processo.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Iten extends AbstractEntity {

    @Column()
    codMatMEd: number;
    
    @ManyToOne(()=> Processo, (processo)=>processo.itens)
    processo: Processo;
}