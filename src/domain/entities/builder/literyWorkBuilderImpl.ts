import { AuthorEntity, BookEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus, NovelEntity } from '../';

import { ILiteryWorkBuilder } from './iliteryWork';

export class LiteryWorkBuilderImpl implements ILiteryWorkBuilder {

    private type: string = '';
    private id: string = '';
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
    public readingAge: number = 0;

  setType(type: string): void {
      this.type = type;     
  }

  setLiteryWork(title: string, url: string, publicationYear: number, price: number, stock: number): void {
    this.title = title;
    this.url = url;
    this.publicationYear = publicationYear;
    this.price = price;
    this.stock = stock;   
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

  build(): LiteryWorkEntity {
      return ( this.type === 'NOVEL' ? 
            new NovelEntity( this.genres,
                             this.readingAge,
                             this.id, 
                             this.title, 
                             this.url, 
                             this.publicationYear,                              
                             this.price, 
                             this.stock, 
                             this.authors,                               
                             this.status!) :
            new BookEntity( this.pages,
                            this.knowledgeAreas,
                            this.id, 
                            this.title, 
                            this.url, 
                            this.publicationYear,                            
                            this.price, 
                            this.stock, 
                            this.authors,                        
                            this.status! ) );
  }
}