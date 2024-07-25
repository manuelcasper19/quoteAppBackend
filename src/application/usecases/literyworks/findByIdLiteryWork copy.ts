import { IliteryWorkRepository, IUseCase } from '../../../domain';
import { LiteryWorkQueryResultDto, LiteryWorkMapper } from '../../';

export class FindByTitleLiteryWorkUseCase implements IUseCase<string, LiteryWorkQueryResultDto> {
    
constructor( private literyWorkRepository : IliteryWorkRepository) {}
   async execute( title: string ): Promise<LiteryWorkQueryResultDto> {
        const queryResult = await this.literyWorkRepository.findByTitle( title );
        if (!queryResult) {

            throw new Error(`LiteryWork with title: ${title} not found`);
        }

        return LiteryWorkMapper.convertQueryResultToDto( queryResult )
       
    }
}