import { AuthorEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '../entities';

export interface ILiteryWorkDirector {
    createNovel(
        literyWorkId: string,
        genres: Genre[],
        readingAge: number,
        title: string,
        url: string,
        publicationYearationYear: number,
        price: number,
        stock: number,
        authors: AuthorEntity[],
        status: LiteryWorkStatus       
    ): LiteryWorkEntity;

    createBook(
        literyWorkId: string,
        title: string,
        url: string,
        publicationYear: number,
        price: number,
        stock: number,
        authors: AuthorEntity[],
        knowledgeAreas: KnowlodgeArea[],
        pages: number,
        status: LiteryWorkStatus
    ): LiteryWorkEntity;
  }