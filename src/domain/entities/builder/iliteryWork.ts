import { AuthorEntity, CopyEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '../';

export interface ILiteryWorkBuilder {

    setType( type: string ): void;

    setBody( literyWorkId: string, title: string, url: string,  publicationYear: number, price: number ): void;

    setCopies(copies : CopyEntity[]): void

    setAuthor( authors: AuthorEntity[] ): void;

    setGenreNovel( genre: Genre[], readingAge: number ): void;

    setKnowledgeAreaBook( knowledgeArea: KnowlodgeArea[], pages: number ): void;

    setStatus( status: LiteryWorkStatus ): void;

    build(): LiteryWorkEntity;
}