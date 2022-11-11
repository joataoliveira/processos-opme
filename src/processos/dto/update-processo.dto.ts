import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {IsAlpha, IsDate, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length, length, max, ValidateNested } from 'class-validator'
import { Segurado } from 'src/segurados/entities/segurado.entity';
import { CreateProcessoDto } from './create-processo.dto';

export class UpdateProcessoDto extends PartialType(CreateProcessoDto) {

    @ValidateNested({message:"Tipo informado errado"})
    segurado :Segurado;

    @IsDate({message:"Data invalida"})
    @Type(() => Date)
    dataProcesso?: Date;

    @IsNumber({allowNaN:false},{message:"Somente Numero"})
    @IsPositive()
    crmMedico :number;
    
    @IsNumber({allowNaN:false},{message:"Somente Numero"})
    @IsPositive()
    seqHospital :number;
}
