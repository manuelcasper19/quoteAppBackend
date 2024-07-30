import { AppError } from '../errors';
import { CopyStatus } from './copyStatus';

export class CopyEntity {

    constructor( public copyLiteryWorkdId : string,
                 public acquisitionDate: Date,
                 public statusCopy: CopyStatus
     ){}

     borrow(): void {

        if( this.statusCopy !== CopyStatus.AVAILABLE ) throw new AppError('Copy is not available for borrowing', 400 );
        
        this.statusCopy = CopyStatus.BORROWED;
     }

     return(): void {

        if( this.statusCopy !== CopyStatus.BORROWED )  throw new AppError('Copy is not borrowed', 400 );

        this.statusCopy = CopyStatus.AVAILABLE;
     }
}