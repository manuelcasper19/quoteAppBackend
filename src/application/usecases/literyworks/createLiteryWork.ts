import { BookEntity, IliteryWorkRepository, IUseCase, LiteryWorkDirector, LiteryWorkEntity, NovelEntity } from '../../../domain';
import { LiteryWorkCreateDto, LiteryWorkMapper, AuthorMapper, LiteryWorkResponseDto } from '../../';


export class CreateLiteryWorkUseCase implements IUseCase<LiteryWorkCreateDto, LiteryWorkResponseDto> {

    constructor( private literyWorkRepository : IliteryWorkRepository, 
                 private literyWorkBuilder    : LiteryWorkDirector
     ){}
  
   async execute({ type, 
              genres, 
              readingAge, 
              title, 
              url, 
              publicationYear, 
              price, 
              stock, 
              authors, 
              status,              
            knowledgeAreas,
              pages  }: LiteryWorkCreateDto ):  Promise<LiteryWorkResponseDto> {
        let literyWork;        
        if(type === 'NOVEL'){
            literyWork = this.literyWorkBuilder.createNovel( 
                '',
                LiteryWorkMapper.mapGenres( genres ), 
                readingAge, 
                title, 
                url, 
                publicationYear, 
                price, 
                stock, 
                AuthorMapper.mapAuthors(authors), 
                LiteryWorkMapper.mapStatus(status)  ) as NovelEntity;
        
        }
        if(type === 'BOOK'){
            literyWork = this.literyWorkBuilder.createBook( 
                '',
                title,
                url,
                publicationYear,
                price, 
                stock,
                authors,
                LiteryWorkMapper.mapKnowledgeAreas( knowledgeAreas ),
                pages,
                LiteryWorkMapper.mapStatus(status) ) as BookEntity;
            }
            
            const savedEntity  = await this.literyWorkRepository.save( literyWork as LiteryWorkEntity );
           
            return LiteryWorkMapper.convertToResponseDto( savedEntity );

    }
    
}