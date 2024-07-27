import { BookEntity, ILiteryWorkDirector, IliteryWorkRepository, IUseCase, LiteryWorkDirector, LiteryWorkEntity, NovelEntity } from '../../../domain';
import { LiteryWorkMapper, AuthorMapper,  LiteryWorkDto, NovelDto, BookDto } from '../..';
import { injectable, inject  } from 'inversify';
import { TYPESDI } from '../../../infraestructure/containers/types';


@injectable()
export class CreateOrUpdateLiteryWorkUseCase implements IUseCase<LiteryWorkDto, LiteryWorkDto> {

    constructor( @inject(TYPESDI.IliteryWorkRepository) private literyWorkRepository : IliteryWorkRepository, 
                 @inject(TYPESDI.ILiteryWorkDirector) private literyWorkBuilder    : ILiteryWorkDirector
                ){}
  
     async execute(dto: LiteryWorkDto): Promise<LiteryWorkDto> {
        console.log(dto)
        let literyWork: LiteryWorkEntity;

        if (dto.type === 'NOVEL') {
            literyWork = this.literyWorkBuilder.createNovel(
                dto.literyWorkId || '',
                LiteryWorkMapper.mapGenres(dto.genres),
                dto.readingAge,
                dto.title,
                dto.url,
                dto.publicationYear,
                dto.price,
                dto.stock,
                AuthorMapper.mapAuthors(dto.authors),
                LiteryWorkMapper.mapStatus(dto.status)
            ) as NovelEntity;
        } else if (dto.type === 'BOOK') {
            literyWork = this.literyWorkBuilder.createBook(
                dto.literyWorkId || '', 
                dto.title,
                dto.url,
                dto.publicationYear,
                dto.price,
                dto.stock,
                dto.authors,
                LiteryWorkMapper.mapKnowledgeAreas(dto.knowledgeAreas),
                dto.pages,
                LiteryWorkMapper.mapStatus(dto.status)
            ) as BookEntity;
        } else {
            throw new Error('Invalid LiteryWorkDto type');
        }
       // console.log(literyWork)
        const savedEntity = await this.literyWorkRepository.createOrUpdate(literyWork);

        return LiteryWorkMapper.convertToResponseDto(savedEntity);
    }
    
}