import { AuthorEntity, Genre, LiteryWorkStatus } from './';

export class LiteryWorkEntity {

    constructor(  public literyWorkId: string,
                  public title: string,
                  public url: string,
                  public publicationYear : number,                 
                  public price : number,
                  public stock : number,
                  public authors: AuthorEntity[],                  
                  public status: LiteryWorkStatus ) {}
    
}