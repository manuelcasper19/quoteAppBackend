import { injectable } from 'inversify';
import { AuthorEntity, BookEntity, CopyEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../';

import { ILiteryWorkBuilder } from './iliteryWork';

@injectable()
export class LiteryWorkBuilderImpl implements ILiteryWorkBuilder {

    private type: string = '';
    private literyWorkId: string = '';
    private title: string = '';
    private authors: AuthorEntity[] = [];
    private url: string = '';
    private status?: LiteryWorkStatus;
    private publicationYear: number = 0;
    private stock: number = 0;
    private genres: Genre[] = [];
    private knowledgeAreas: KnowlodgeArea[] = [];
    private price: number = 0;
    private pages: number = 0;
    private readingAge: number = 0;
    private copies: CopyEntity[] = [];

  setType(type: string): void {
      this.type = type;     
  }

  setBody(literyWorkId: string, title: string, url: string, publicationYear: number, price: number): void {
    this.literyWorkId = literyWorkId;
    this.title = title;
    this.url = url;
    this.publicationYear = publicationYear;
    this.price = price;     
  }

  setAuthor(authors: AuthorEntity[]): void {
      this.authors = authors;
  }

  setGenreNovel(genres: Genre[], readingAge: number ): void {
      this.readingAge = readingAge;
      this.genres = genres;
  }

  setKnowledgeAreaBook(knowledgeArea: KnowlodgeArea[], pages: number): void {
      this.knowledgeAreas = knowledgeArea;
      this.pages = pages;
  }
  setStatus(status: LiteryWorkStatus): void {

      this.status = status;
  }

  setCopies(copies: CopyEntity[]): void {
      this.copies = copies;
  }

  build(): LiteryWorkEntity {
      return ( this.type === 'NOVEL' ? 
            new NovelEntity( this.genres,
                             this.readingAge,
                             this.literyWorkId, 
                             this.title, 
                             this.url, 
                             this.publicationYear,                              
                             this.price,                            
                             this.authors,                               
                             this.status!, 
                             this.copies) :
            new BookEntity( this.pages,
                            this.knowledgeAreas,
                            this.literyWorkId, 
                            this.title, 
                            this.url, 
                            this.publicationYear,                            
                            this.price,                           
                            this.authors,                        
                            this.status!,
                            this.copies ) );
  }
}