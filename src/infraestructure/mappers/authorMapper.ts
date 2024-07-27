import { AuthorEntity } from '../../domain';
import { IAuthor } from '../schemas';


export class AuthorMapper {

    static toDomainEntity(author: IAuthor): AuthorEntity{
        return new AuthorEntity(
            author.authorId.toString(), 
            author.name,
            author.email,
            author.active
        );
    }
}