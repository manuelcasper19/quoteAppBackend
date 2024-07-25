import { AuthorEntity } from '../../domain';
import { AuthorDto } from '../dtos';

export class AuthorMapper {

    static toDomain(authorDto: AuthorDto): AuthorEntity {
        return new AuthorEntity(
            authorDto.authorId,
            authorDto.name,
            authorDto.email
        );
    }

    static mapAuthors(authorDtos: AuthorDto[]): AuthorEntity[] {
        return authorDtos.map(authorDto => this.toDomain(authorDto));
    }
}