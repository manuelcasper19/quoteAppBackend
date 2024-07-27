import { Request, Response} from 'express';
import { injectable, inject  } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TYPESDI } from '../../containers';
import { IUseCase } from '../../../domain';
import { LiteryWorkDto, LiteryWorkQueryResultDto, SearchParams } from '../../../application';

@controller('/api/literywork')
export class LiteryWorkController {
    constructor( 
        @inject(TYPESDI.CreateOrUpdateLiteryWorkUseCase) private createOrUpdateUseCase: IUseCase<LiteryWorkDto, LiteryWorkDto>,
        @inject(TYPESDI.GetLiteryWorkByIdUseCase) private getByIdUseCase: IUseCase<string, LiteryWorkDto>,
        @inject(TYPESDI.GenericLiteryWorkSearchUseCase) private searchUseCase: IUseCase<SearchParams, LiteryWorkQueryResultDto> 
    ){}
    @httpPost('/')
    async createOrUpdate(req: Request, res: Response): Promise<void> {
        //const result = await this.createOrUpdateUseCase.execute(req.body);
        res.status(201). json({ msg: 'createOrUpdate'});
    }
    
    @httpGet('/:id')
    async getById(req: Request, res: Response): Promise<void> {
       // const result = await this.getByIdUseCase.execute(req.params.id);
       res.status(201). json({ msg: 'getById'});
    }
    
    @httpPost('/search')
    async search(req: Request, res: Response): Promise<void> {
       // const result = await this.searchUseCase.execute(req.body);
       res.status(201). json({ msg: 'search'});
    }

}