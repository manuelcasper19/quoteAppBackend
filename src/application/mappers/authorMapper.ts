import { AuthorEntity } from '../../domain';
import { AuthorDto } from '../dtos';

export class AuthorMapper {

    static toDomain(authorDto: AuthorDto): AuthorEntity {
        return new AuthorEntity(
            authorDto.authorId,
            authorDto.name,
            authorDto.email,
            authorDto.active
        );
    }

    static toDto( author: AuthorEntity ): AuthorDto {
        return new AuthorDto( author.authorId, author.name, author.email, author.active );
    }
    static mapAuthors(authorDtos: AuthorDto[]): AuthorEntity[] {
        return authorDtos.map(authorDto => this.toDomain(authorDto));
    }
}