import {IsAlpha, IsDate, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length, length, max, ValidateNested } from 'class-validator'
import { Iten } from 'src/itens/entities/iten.entity';
import { Type } from 'class-transformer';
import { Segurado } from "src/segurados/entities/segurado.entity";

export class CreateProcessoDto {

    @ValidateNested({message:"Tipo informado errado"})
    @IsNotEmpty()
    segurado :Segurado;

    @IsDate({message:"Data invalida"})
    @IsNotEmpty({message:"Data Processo obrigatório"})
    @Type(() => Date)
    dataProcesso?: Date;

    @IsNumber({allowNaN:false},{message:"Somente Numero"})
    @IsNotEmpty({message:"CM Processo obrigatório"})
    @IsPositive()
    crmMedico :number;
    
    @IsNumber({allowNaN:false},{message:"Somente Numero"})
    @IsNotEmpty({message:"Hospital Processo obrigatório"})
    @IsPositive()
    seqHospital :number;

    @ValidateNested({message:"Tipo informado errado"})
    @IsNotEmpty({message:"Itens obrigatório"})
    itens :Iten[];


}
