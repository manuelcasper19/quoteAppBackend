import { AuthorEntity } from '../../domain';
import { IAuthor } from '../schemas';


export class AuthorMapper {

    static toDomainEntity(author: IAuthor): AuthorEntity{
  
        const id = author.authorId ? author.authorId.toString() : author._id.toString();
        return new AuthorEntity(
            id,
            author.name,
            author.email,
            author.active
        );
    }
}