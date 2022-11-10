import {IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Length,} from 'class-validator'
export class CreateCarteiraDto {
    
    @IsNotEmpty({message:"Carteira Obrigatoria"})
    @Length(17,17,{message:"O tamanho deve ser 17"})
    @IsString({message:"Deve ser String"})
    @IsNumberString(IsPositive,{message:"Informar somente números"})
    carteira: string

    @IsNotEmpty({message:"Carteira Obrigatoria"})
    @IsNumber()
    @IsPositive({message:"Deve ser maior que 0"})
    viaCarteira: number;
    
}
