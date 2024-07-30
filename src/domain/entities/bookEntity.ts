import { AuthorEntity, CopyEntity, Genre, KnowlodgeArea, LiteryWorkEntity, LiteryWorkStatus } from '.';


export class BookEntity extends LiteryWorkEntity {
  
 
    constructor(  
                 public pages : number, 
                 public KnowlodgeAreas: KnowlodgeArea[],
                 public literyWorkId: string,
                 public title: string,
                 public url: string,
                 public publicationYear : number,                 
                 public price : number,          
                 public authors: AuthorEntity[],                 
                 public status: LiteryWorkStatus,
                 public copies: CopyEntity[] ) {

       super( literyWorkId, title, url, publicationYear, price, authors, status, copies );     
        
    }
}