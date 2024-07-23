import { AuthorEntity, Genre, LiteryWorkEntity, LiteryWorkStatus } from '.';


export class NovelEntity extends LiteryWorkEntity {

    constructor( public genres: Genre[], 
                 public readingAge: number,
                 public literyWorkId: string,
                 public title: string,
                 public url: string,
                 public publicationYear : number,                 
                 public price : number,
                 public stock : number,
                 public authors: AuthorEntity[],                 
                 public status: LiteryWorkStatus  ) {
     
        super( literyWorkId, title, url, publicationYear, price, stock, authors, status );     
    }
    
}