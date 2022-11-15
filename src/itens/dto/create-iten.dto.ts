import {IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Length,} from 'class-validator'

export class CreateItenDto {
    
    @IsNotEmpty({message:"Código Obrigatoria"})
    @Length(7,7,{message:"O tamanho deve ser 17"})
    @IsNumber()
    @IsPositive({message:"Deve ser maior que 0"})
    codMatMed: number;
       
    @IsNotEmpty({message:"Descrição Obrigatoria"})
    @IsString({message:"Deve ser String"})
    descricao: string;

}
