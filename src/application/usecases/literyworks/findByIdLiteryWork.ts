import { IliteryWorkRepository, IUseCase } from '../../../domain';
import { LiteryWorkDto, LiteryWorkMapper } from '../../';

export class GetLiteryWorkByIdUseCase implements IUseCase<string, LiteryWorkDto> {
    
    constructor( private literyWorkRepository : IliteryWorkRepository) {}
   async execute( literyWorkId: string ): Promise<LiteryWorkDto> {
        const literyWork = await this.literyWorkRepository.findById( literyWorkId );
        if (!literyWork) {

            throw new Error(`LiteryWork with ID ${literyWorkId} not found`);
        }

        return LiteryWorkMapper.convertToResponseDto(literyWork);
       
    }
}