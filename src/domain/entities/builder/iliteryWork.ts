import { AuthorEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '../';

export interface ILiteryWorkBuilder {

    setType( type: string ): void;

    setLiteryWork( title: string, 
                   url: string, 
                   publicationYear: number,                    
                   price: number, 
                   stock: number ): void;
    setAuthor( authors: AuthorEntity[] ): void;

    setGenreNovel( genre: Genre[], readingAge: number ): void;

    setKnowledgeAreaBook( knowledgeArea: KnowlodgeArea[], pages: number ): void;

    setStatus( status: LiteryWorkStatus ): void;

    build(): LiteryWorkEntity;
}