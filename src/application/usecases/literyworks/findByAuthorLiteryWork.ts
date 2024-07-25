import { IliteryWorkRepository, IUseCase } from '../../../domain';
import { LiteryWorkQueryResultDto, LiteryWorkMapper } from '../..';

export class FindByAuthorLiteryWorkUseCase implements IUseCase<string, LiteryWorkQueryResultDto> {
    
constructor( private literyWorkRepository : IliteryWorkRepository) {}
   async execute( author: string ): Promise<LiteryWorkQueryResultDto> {
        const queryResult = await this.literyWorkRepository.findByTitle( author );
        if (!queryResult) {

            throw new Error(`LiteryWork with author: ${author} not found`);
        }

        return LiteryWorkMapper.convertQueryResultToDto( queryResult )
       
    }
}