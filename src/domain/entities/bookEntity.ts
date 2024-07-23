import { AuthorEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '.';


export class BookEntity extends LiteryWorkEntity {
  
 
    constructor(  
                 public pages : number, 
                 public KnowlodgeAreas: KnowlodgeArea[],
                 public literyWorkId: string,
                 public title: string,
                 public url: string,
                 public publicationYear : number,                 
                 public price : number,
                 public stock : number,
                 public authors: AuthorEntity[],                 
                 public status: LiteryWorkStatus ) {

       super( literyWorkId, title, url, publicationYear, price, stock, authors, status );     
        
    }
}