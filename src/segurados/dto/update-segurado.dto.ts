import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguradoDto } from './create-segurado.dto';

export class UpdateSeguradoDto extends PartialType(CreateSeguradoDto) {}
