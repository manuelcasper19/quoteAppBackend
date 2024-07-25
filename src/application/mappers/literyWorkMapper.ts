import { BookEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../../domain';
import { AuthorDto, LiteryWorkResponseDto } from '../dtos';

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

    static convertToResponseDto(entity: LiteryWorkEntity): LiteryWorkResponseDto {
        const baseResponse = {
            type: entity instanceof NovelEntity ? 'NOVEL' : 'BOOK',
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
            return new LiteryWorkResponseDto(
                baseResponse.type,
                baseResponse.literyWorkId,
                baseResponse.title,
                baseResponse.authors,
                baseResponse.url,
                baseResponse.status,
                baseResponse.publicationYear,
                baseResponse.stock,
                baseResponse.price,
                entity.genres.map(g => g.toString()),
                undefined,
                undefined,
                entity.readingAge
            );
        } else if (entity instanceof BookEntity) {
            return new LiteryWorkResponseDto(
                baseResponse.type,
                baseResponse.literyWorkId,
                baseResponse.title,
                baseResponse.authors,
                baseResponse.url,
                baseResponse.status,
                baseResponse.publicationYear,
                baseResponse.stock,
                baseResponse.price,
                undefined,
                entity.KnowlodgeAreas.map(ka => ka.toString()),
                entity.pages,
                undefined
            );
        }
    
        throw new Error('Unknown literary work type');
    }

}