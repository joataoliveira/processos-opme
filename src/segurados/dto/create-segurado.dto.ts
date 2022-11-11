import {IsAlpha, IsDate, IsDateString, IsDefined, IsISO8601, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length, length, max, ValidateNested } from 'class-validator'
import { Transform, Type } from 'class-transformer';
import { Carteira } from 'src/carteiras/entities/carteira.entity';

export class CreateSeguradoDto {

    @IsNotEmpty({message:"Nome obrigatório"})
    @Length(0,60,{message:"O tamanho deve ser 0 e 60"})
    //@IsAlpha("Informar somente letras")
    @IsString({message:"Deve ser String"})
    @Transform(({ value }) => value.toUpperCase())
    nomeSegurado: String;
    
    @IsDate({message:"Data nascimento invalida"})
    @IsNotEmpty()
    @Type(() => Date)
    //@IsISO8601()
    dataNascimento?: Date;

    @ValidateNested({message:"Tipo informado errado"})
    //@IsDefined()
    //@IsNotEmpty()
    carteira: Carteira;

}
