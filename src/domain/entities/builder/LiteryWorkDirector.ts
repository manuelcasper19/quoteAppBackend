import { inject, injectable } from 'inversify';
import { AuthorEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '../';
import { ILiteryWorkDirector } from '../../interfaces';
import { ILiteryWorkBuilder } from './iliteryWork';
import { TYPESDI } from '../../../infraestructure/containers/types';

@injectable()
export class LiteryWorkDirector implements ILiteryWorkDirector {

    constructor( @inject(TYPESDI.ILiteryWorkBuilder) private builder: ILiteryWorkBuilder ) {
        
    }

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
    ): LiteryWorkEntity {

        this.builder.setType('NOVEL');
        this.builder.setLiteryWork(literyWorkId, title, url, publicationYearationYear, price, stock);
        this.builder.setGenreNovel(genres, readingAge);
        this.builder.setStatus(status);
        this.builder.setAuthor(authors);

        return this.builder.build();

    }

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
    ): LiteryWorkEntity {
        this.builder.setType('BOOK');
        this.builder.setLiteryWork(literyWorkId, title, url, publicationYear, price, stock);
        this.builder.setAuthor(authors);
        this.builder.setKnowledgeAreaBook(knowledgeAreas, pages);
        this.builder.setStatus(status);

        return this.builder.build();
    }
}