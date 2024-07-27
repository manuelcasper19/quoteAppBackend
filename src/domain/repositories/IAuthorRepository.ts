import { AuthorEntity,  } from '../entities';

export interface IAuthorRepository {

   createOrUpdateAuthor( author: AuthorEntity ): Promise<AuthorEntity>;

   findByIdAuthor( id: string): Promise<AuthorEntity | null >;

   findByNameAuthor( name: string ):  Promise<AuthorEntity[] | null>;
   
   getAllAuthor(): Promise<AuthorEntity[] | null>
   
}