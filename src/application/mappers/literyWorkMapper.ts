import { BookEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../../domain';
import { AuthorDto, BookDto, LiteryWorkDto, NovelDto } from '../dtos';

export class LiteryWorkMapper {

    static mapGenres(genres: string[]): Genre[] {
        return genres.map(genre => {
            if (Object.values(Genre).includes(genre as Genre)) {
                return genre as Genre;
            }
            throw new Error(`Invalid genre: ${genre}`);
        });
    }

    static mapStatus(status: string): LiteryWorkStatus {
        if (Object.values(LiteryWorkStatus).includes(status as LiteryWorkStatus)) {
            return status as LiteryWorkStatus;
        }
        throw new Error(`Invalid status: ${status}`);
    }

    static mapKnowledgeAreas(areas: string[]): KnowlodgeArea[] {
        return areas.map(area => {
            if (Object.values(KnowlodgeArea).includes(area as KnowlodgeArea)) {
                return area as KnowlodgeArea;
            }
            throw new Error(`Invalid knowledge area: ${area}`);
        });
    }  

    static convertToResponseDto(entity: LiteryWorkEntity): LiteryWorkDto  {
        const baseProps = {
            literyWorkId: entity.literyWorkId,
            title: entity.title,
            authors: entity.authors.map(author => new AuthorDto(author.authorId, author.name, author.email)),
            url: entity.url,
            status: entity.status,
            publicationYear: entity.publicationYear,
            stock: entity.stock,
            price: entity.price,
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
                baseProps.price,
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
                baseProps.stock,
                baseProps.price,
                entity.KnowlodgeAreas.map(ka => ka.toString()),
                entity.pages
            );
        }
    
        throw new Error('Unknown literary work type');
    }

}