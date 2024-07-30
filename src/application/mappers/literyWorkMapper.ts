import { AppError, BookEntity, CopyEntity, CopyStatus, Genre, IQueryResult, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../../domain';
import { AuthorDto, BookDto, CopyLiteryWorkDto, LiteryWorkDto, LiteryWorkQueryResultDto, NovelDto } from '../dtos';

export class LiteryWorkMapper {

    static mapGenresToEntity(genres: string[]): Genre[] {
        return genres.map(genre => {
            if (Object.values(Genre).includes(genre as Genre)) {
                return genre as Genre;
            }
            throw new Error(`El genero de la novela: ${genre}, no es valido`);
        });
    }

    static mapCopiesToEntity( copies: CopyLiteryWorkDto[] ): CopyEntity[] {
        return copies.map( entity => 
            new CopyEntity( entity.copiesLiteryWorkId, entity.acquisitionDate, this.mapStatusCopiesToEntity(entity.statusCopy) )
        )
    }

    static mapStatusCopiesToEntity( status: string ): CopyStatus {
    if( Object.values( CopyStatus ).includes( status as CopyStatus )){
        return status as CopyStatus;
    }
    throw new AppError(`The state: ${ status } does not exit`, 400 );
    }

    static mapStatusToEntity(status: string): LiteryWorkStatus {
        if (Object.values(LiteryWorkStatus).includes(status as LiteryWorkStatus)) {
            return status as LiteryWorkStatus;
        }
        throw new AppError(`The state: ${ status } does not exit`, 400 );
    }

    static mapKnowledgeAreasToEntity(areas: string[]): KnowlodgeArea[] {
        return areas.map(area => {
            if (Object.values(KnowlodgeArea).includes(area as KnowlodgeArea)) {
                return area as KnowlodgeArea;
            }
            throw new AppError(`Invalid knowledge area: ${ area } does not exit`, 400 );            
        });
    }  

    static convertToResponseDto(entity: LiteryWorkEntity): LiteryWorkDto  {
        const baseProps = {
            literyWorkId: entity.literyWorkId,
            title: entity.title,
            authors: entity.authors.map(author => new AuthorDto(author.authorId, author.name, author.email, author.active)),
            url: entity.url,
            status: entity.status,
            publicationYear: entity.publicationYear,
            stock: entity.stock,
            price: entity.price,
            copies: entity.copies.map( copy => new CopyLiteryWorkDto( copy.copyLiteryWorkdId, copy.acquisitionDate, copy.statusCopy ))
        };
    
        if (entity instanceof NovelEntity) {
            return new NovelDto(
                baseProps.literyWorkId,
                baseProps.title,
                baseProps.authors,
                baseProps.url,
                baseProps.status,
                baseProps.publicationYear,
                baseProps.stock,
                baseProps.copies,
                entity.genres.map(g => g.toString()),
                entity.readingAge
            );
        } else if (entity instanceof BookEntity) {
            return new BookDto(
                baseProps.literyWorkId,
                baseProps.title,
                baseProps.authors,
                baseProps.url,
                baseProps.status,
                baseProps.publicationYear,
                baseProps.price,
                baseProps.copies,
                entity.KnowlodgeAreas.map(ka => ka.toString()),
                entity.pages
            );
        }
    
        throw new Error('Unknown literary work type');
    }

    static convertQueryResultToDto(queryResult: IQueryResult<LiteryWorkEntity>): LiteryWorkQueryResultDto {
        const results = queryResult.results.map(this.convertToResponseDto);
        return new LiteryWorkQueryResultDto(
            results,
            queryResult.total,
            queryResult.page,
            queryResult.limit
        );
    }

}