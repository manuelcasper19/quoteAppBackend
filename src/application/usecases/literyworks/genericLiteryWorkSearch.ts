import { IliteryWorkRepository, IPaginationOptions, IQueryResult, IUseCase, LiteryWorkEntity } from '../../../domain';
import { LiteryWorkQueryResultDto } from '../../dtos';
import { LiteryWorkMapper } from '../../mappers';

type SearchMethod = Extract<keyof IliteryWorkRepository, 
  'findByTitle' | 'findByAuthor' | 'findByPublicationYear' | 'findByGenreNovel' | 'findByKnowledgeArea' | 'getAll'
>;

interface SearchParams {
    method: SearchMethod;
    param?: string | number;
    options?: IPaginationOptions;
  }

  export class GenericLiteryWorkSearchUseCase implements IUseCase<SearchParams, LiteryWorkQueryResultDto> {

    private methodMap: Record<SearchMethod, (param: any, options?: IPaginationOptions) => Promise<IQueryResult<LiteryWorkEntity> | null>>;

    constructor(private literyWorkRepository: IliteryWorkRepository) {
        this.methodMap = {
          findByTitle: (param, options) => this.literyWorkRepository.findByTitle(param as string, options),
          findByAuthor: (param, options) => this.literyWorkRepository.findByAuthor(param as string, options),
          findByPublicationYear: (param, options) => this.literyWorkRepository.findByPublicationYear(param as number, options),
          findByGenreNovel: (param, options) => this.literyWorkRepository.findByGenreNovel(param as string, options),
          findByKnowledgeArea: (param, options) => this.literyWorkRepository.findByKnowledgeArea(param as string, options),
          getAll: (_, options) => this.literyWorkRepository.getAll(options),
        };
      }

     async execute({ method, param, options }: SearchParams): Promise<LiteryWorkQueryResultDto> {

        const repositoryMethod = this.methodMap[method];

        if (!repositoryMethod) throw new Error('Invalid search method');

        const queryResult = await repositoryMethod(param, options);

        if (!queryResult)  throw new Error(`LiteryWork not found with ${method}: ${param}`);

        return LiteryWorkMapper.convertQueryResultToDto(queryResult);
          
          
     }
  }