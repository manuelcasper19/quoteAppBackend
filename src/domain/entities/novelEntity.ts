import { AuthorEntity, CopyEntity, Genre, LiteryWorkEntity, LiteryWorkStatus } from '.';


export class NovelEntity extends LiteryWorkEntity {

    constructor( public genres: Genre[], 
                 public readingAge: number,
                 public literyWorkId: string,
                 public title: string,
                 public url: string,
                 public publicationYear : number,                 
                 public price : number,               
                 public authors: AuthorEntity[],                 
                 public status: LiteryWorkStatus,
                 public copies: CopyEntity[]  ) {
     
        super( literyWorkId, title, url, publicationYear, price,  authors, status, copies );     
    }
    
}