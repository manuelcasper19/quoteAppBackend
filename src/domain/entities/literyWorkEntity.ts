import { AuthorEntity, Genre, LiteryWorkStatus } from './';

export class LiteryWorkEntity {

    constructor(  protected literyWorkId: string,
                  protected title: string,
                  protected url: string,
                  protected publicationYear : number,
                  protected pages : number,
                  protected price : number,
                  protected stock : number,
                  protected authors: AuthorEntity[],
                  protected genres: Genre[],
                  protected status: LiteryWorkStatus ) {}
}