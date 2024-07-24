import { LiteryWorkEntity } from '../entities';

export interface IliteryWorkRepository {

   save( literyWork: LiteryWorkEntity ): Promise<LiteryWorkEntity>;

   findById( id: string): Promise<LiteryWorkEntity | null >;

   findByTitle( title: string):  Promise<LiteryWorkEntity[] | null>;

   findByAuthor( author: string):  Promise<LiteryWorkEntity[] | null>;

   findByPublicationYear( year: number):  Promise<LiteryWorkEntity[] | null>;

   findByGenreNovel( genre: string ):  Promise<LiteryWorkEntity[] | null>;

   findByKnowledgeArea( area: string ):  Promise<LiteryWorkEntity[] | null>;
}