import { inject, injectable } from 'inversify';
import { AuthorEntity, IAuthorRepository, IUseCase } from '../../../domain';
import { AuthorDto, AuthorMapper } from '../../';
import { TYPESDI } from '../../../infraestructure/containers/types';


type SearchMethod = 'findByIdAuthor' | 'findByNameAuthor' | 'getAllAuthor';

export interface SearchParamsAuthor {
    method: SearchMethod;
    param?: string; 
}

@injectable()
export class GenericFindAuthorUseCase implements IUseCase<SearchParamsAuthor, AuthorDto | AuthorDto[]> {

    private methodMap: Record<SearchMethod, (param: any) => Promise<AuthorEntity | AuthorEntity[] | null>>;

    constructor( @inject(TYPESDI.IAuthorRepository) private authorRepository: IAuthorRepository ){
        this.methodMap = {
            findByIdAuthor: ( param) => this.authorRepository.findByIdAuthor( param as string ),
            findByNameAuthor: ( param) => this.authorRepository.findByNameAuthor( param as string),
            getAllAuthor: () => this.authorRepository.getAllAuthor()
        }
    }

    async execute({ method, param }: SearchParamsAuthor): Promise<AuthorDto | AuthorDto[]> {

        const repositoryAuthorMethod = this.methodMap[ method ];

        if(!repositoryAuthorMethod ) throw new Error('Invalid search method');

        const result = await repositoryAuthorMethod( param );

        if(!result) throw new Error(`No se encontro author con : ${param}`);

        return (Array.isArray(result)) 
            ? result.map( author => AuthorMapper.toDto( author ))
            : AuthorMapper.toDto( result );
    }
}