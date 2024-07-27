import { AuthorEntity,  } from '../entities';

export interface IAuthorRepository {

   createOrUpdateAuthor( Author: AuthorEntity ): Promise<AuthorEntity>;

   findByIdAuthor( id: string): Promise<AuthorEntity | null >;

   findByNameAuthor( author: string ):  Promise<AuthorEntity | null>;
   
   getAllAuthor(): Promise<AuthorEntity[] | null>
   
}