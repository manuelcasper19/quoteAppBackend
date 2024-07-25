import { LiteryWorkEntity } from '../entities';
import { IPaginationOptions, IQueryResult } from '../interfaces';

export interface IliteryWorkRepository {

   createOrUpdate( literyWork: LiteryWorkEntity ): Promise<LiteryWorkEntity>;

   findById( id: string): Promise<LiteryWorkEntity | null >;

   findByTitle( title: string, options: IPaginationOptions):  Promise<IQueryResult<LiteryWorkEntity> | null>;

   findByAuthor( author: string, options: IPaginationOptions):  Promise<IQueryResult<LiteryWorkEntity> | null>;

   findByPublicationYear( year: number, options: IPaginationOptions):  Promise<IQueryResult<LiteryWorkEntity> | null>;

   findByGenreNovel( genre: string, options: IPaginationOptions ):  Promise<IQueryResult<LiteryWorkEntity> | null>;

   findByKnowledgeArea( area: string , options: IPaginationOptions):  Promise<IQueryResult<LiteryWorkEntity> | null>;

   getAll( options: IPaginationOptions ) : Promise<IQueryResult<LiteryWorkEntity> | null>;
}