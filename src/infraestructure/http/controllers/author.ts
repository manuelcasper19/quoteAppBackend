import { Request, Response} from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TYPESDI } from '../../containers';
import { AuthorDto, SearchParamsAuthor } from '../../../application';
import { IUseCase } from '../../../domain';
import { authorValidators, validateField } from '../';


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

    @httpGet('/:id')
    async getById(req: Request, res: Response): Promise<void> {
     const id = req.params.id;
     const result = await this.genericFindAuthor.execute( {
        method: 'findByIdAuthor',
        param: id
     })

     res.status(200).json( { result })
    }

    @httpGet('/name/:name')
    async getByName(req: Request, res: Response): Promise<void> {
        const name = req.params.name;
        const result = await this.genericFindAuthor.execute({
            method: 'findByNameAuthor',
            param: name
        });
        res.status(200).json({ name, result });
    }

    @httpGet('/')
    async getAll(req: Request, res: Response): Promise<void> {
        const result = await this.genericFindAuthor.execute({
            method: 'getAllAuthor'
        });
        res.status(200).json({ result });
    }


}