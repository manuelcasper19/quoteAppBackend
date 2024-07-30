import { AppError } from '../errors';
import { AuthorEntity, CopyEntity, Genre, LiteryWorkStatus } from './';

export class LiteryWorkEntity {
    public amountborroweb : number;
    public stock : number;

    constructor(  public literyWorkId: string,
                  public title: string,
                  public url: string,
                  public publicationYear : number,                 
                  public price : number,                  
                  public authors: AuthorEntity[],                  
                  public status: LiteryWorkStatus,
                  public copies: CopyEntity[] ) {
        this.amountborroweb = 0;
        this.stock = 0;
    }

    addCopies( quantity: number ): void {

        this.stock += quantity;
    }

    borrowCopy(): void {

        if( this.stock <= 0) throw new AppError('No copies available', 400 );

        this.stock--;
        this.amountborroweb++;

        if( this.stock === 0 ) {

            this.status = LiteryWorkStatus.NO_UNITS_AVAILABLE;
        }
    }
    
    returnCopy(): void {
        if( this.amountborroweb === 0) throw new AppError('All copies are already available', 400 );

        this.stock++;

        this.amountborroweb--;

        if( this.stock > 0 ) {

            this.status = LiteryWorkStatus.AVAILABLE;
        }
    }
}