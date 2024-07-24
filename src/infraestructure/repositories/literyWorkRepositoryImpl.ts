import { IliteryWorkRepository, LiteryWorkEntity } from '../../domain';

export class LiteryWorkRepositoryImpl  implements IliteryWorkRepository{
    

   findByAuthor(author: string): Promise<LiteryWorkEntity[] | null> {
       
   }
   findByGenreNovel(genre: string): Promise<LiteryWorkEntity[] | null> {
       
   }
   findById(id: string): Promise<LiteryWorkEntity | null> {
       
   }
   findByKnowledgeArea(area: string): Promise<LiteryWorkEntity[] | null> {
       
   }
   findByPublicationYear(year: number): Promise<LiteryWorkEntity[] | null> {
       
   }
   findByTitle(title: string): Promise<LiteryWorkEntity[] | null> {
       
   }
   save(literyWork: LiteryWorkEntity): Promise<LiteryWorkEntity> {
       
   }
}