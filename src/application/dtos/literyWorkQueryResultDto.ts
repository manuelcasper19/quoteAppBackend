import { IQueryResult } from '../../domain';
import { LiteryWorkDto } from './literyworkDto';

export class LiteryWorkQueryResultDto implements IQueryResult<LiteryWorkDto> {

    constructor(
                public results: LiteryWorkDto[],
                public total: number,
                public page: number,
                public limit: number
    ) {}
}