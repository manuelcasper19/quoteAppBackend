import { Request, Response} from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPESDI } from '../../containers';
import { AuthorDto, SearchParamsAuthor } from '../../../application';
import { IUseCase } from '../../../domain';

@controller('/api/author')
export class AuthorController {

    constructor( 
        @inject( TYPESDI.GenericFindAuthorUseCase ) private genericFindAuthor : IUseCase<SearchParamsAuthor, AuthorDto | AuthorDto[]>,
        @inject( TYPESDI.CreateOrUpdateAuthorUseCase) private createAuthor : IUseCase<AuthorDto, AuthorDto>
    ){}

    @httpPost('/create')
    async create( req: Response, res: Response) :  Promise<void>{

        res.status(201). json({ msg: 'create author' });
    }

}