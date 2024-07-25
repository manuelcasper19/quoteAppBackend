import { BookEntity, IliteryWorkRepository, IUseCase, LiteryWorkDirector, LiteryWorkEntity, NovelEntity } from '../../../domain';
import { LiteryWorkMapper, AuthorMapper,  LiteryWorkDto, NovelDto, BookDto } from '../..';


export class CreateOrUpdateLiteryWorkUseCase implements IUseCase<LiteryWorkDto, LiteryWorkDto> {

    constructor( private literyWorkRepository : IliteryWorkRepository, 
                 private literyWorkBuilder    : LiteryWorkDirector
                ){}
  
     async execute(dto: LiteryWorkDto): Promise<LiteryWorkDto> {
        let literyWork: LiteryWorkEntity;

        if (dto instanceof NovelDto) {
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
        } else if (dto instanceof BookDto) {
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

        const savedEntity = await this.literyWorkRepository.createOrUpdate(literyWork);

        return LiteryWorkMapper.convertToResponseDto(savedEntity);
    }
    
}