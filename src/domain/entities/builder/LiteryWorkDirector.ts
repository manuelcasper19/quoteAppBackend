import { inject, injectable } from 'inversify';
import { AuthorEntity, CopyEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '../';
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
        authors: AuthorEntity[],
        status: LiteryWorkStatus,
        copies: CopyEntity[]    
    ): LiteryWorkEntity {

        this.builder.setType('NOVEL');
        this.builder.setBody(literyWorkId, title, url, publicationYearationYear, price);
        this.builder.setGenreNovel(genres, readingAge);
        this.builder.setStatus(status);
        this.builder.setCopies(copies);
        this.builder.setAuthor(authors);

        return this.builder.build();

    }

    createBook(
        literyWorkId: string,
        title: string,
        url: string,
        publicationYear: number,
        price: number,      
        authors: AuthorEntity[],
        knowledgeAreas: KnowlodgeArea[],
        pages: number,
        status: LiteryWorkStatus,
        copies: CopyEntity[]
    ): LiteryWorkEntity {
        this.builder.setType('BOOK');
        this.builder.setBody(literyWorkId, title, url, publicationYear, price);
        this.builder.setAuthor(authors);
        this.builder.setKnowledgeAreaBook(knowledgeAreas, pages);
        this.builder.setStatus(status);
        this.builder.setCopies(copies);
        
        return this.builder.build();
    }
}