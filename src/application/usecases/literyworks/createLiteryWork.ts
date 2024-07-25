import { IUseCase } from '../../../domain';
import { LiteryWorkCreateDto, LiteryWorkResponseDto } from '../../';

export class CreateLiteryWork implements IUseCase<LiteryWorkCreateDto, LiteryWorkResponseDto>{
  
    execute(tRequest: LiteryWorkCreateDto): LiteryWorkResponseDto {
        
    }
}