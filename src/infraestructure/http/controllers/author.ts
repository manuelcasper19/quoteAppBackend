import { Request, Response} from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPESDI } from '../../containers';
import { AuthorDto, SearchParamsAuthor } from '../../../application';
import { IUseCase } from '../../../domain';
import { authorValidators } from '../validators';
import { validateField } from '../middlewares';

@controller('/api/author')
export class AuthorController {

    constructor( 
        @inject( TYPESDI.GenericFindAuthorUseCase ) private genericFindAuthor : IUseCase<SearchParamsAuthor, AuthorDto | AuthorDto[]>,
        @inject( TYPESDI.CreateOrUpdateAuthorUseCase) private createOrUpdateAuthor : IUseCase<AuthorDto, AuthorDto>
    ){}

    @httpPost('/create', ...authorValidators, validateField )
    async create( req: Request, res: Response) :  Promise<void>{

        const author : AuthorDto = req.body;

        const result = await this.createOrUpdateAuthor.execute( author );

        res.status(201). json({ result });
    }

}