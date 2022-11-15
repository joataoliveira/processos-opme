import { AbstractEntity } from "src/generic/entities/abstract-entity";
import { Processo } from "src/processos/entities/processo.entity";
import { Column, Entity, Index, JoinTable, ManyToOne } from "typeorm";

@Entity()
export class Iten extends AbstractEntity {

    @Column()
    //@Index({ unique: true })
    @Index()
    codMatMed: number;

    @Column()
    descricao: string;

    
   // @ManyToOne(()=> Processo, (processo)=>processo.itens)
   // processo: Processo[];
}