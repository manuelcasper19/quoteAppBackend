import { IliteryWorkRepository, IUseCase, LiteryWorkDirector } from '../../../domain';
import { LiteryWorkCreateDto, LiteryWorkMapper, AuthorMapper, LiteryWorkResponseDto } from '../../';


export class CreateLiteryWorkUseCase implements IUseCase<LiteryWorkCreateDto, LiteryWorkResponseDto> {

    constructor( private literyWorkRepository : IliteryWorkRepository, 
                 private literyWorkBuilder    : LiteryWorkDirector
     ){}
  
    execute({ type, 
              genres, 
              readingAge, 
              title, 
              url, 
              publicationYear, 
              price, 
              stock, 
              authors, 
              status  }: LiteryWorkCreateDto ): LiteryWorkResponseDto {
                
        if(type === 'NOVEL'){
            this.literyWorkBuilder.createNovel( 
                LiteryWorkMapper.mapGenres( genres ), 
                readingAge, 
                title, 
                url, 
                publicationYear, 
                price, 
                stock, 
                AuthorMapper.mapAuthors(authors), 
                LiteryWorkMapper.mapStatus(status)  )
        }
    }
}