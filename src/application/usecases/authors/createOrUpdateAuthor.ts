import { inject, injectable } from 'inversify';
import { IAuthorRepository, IUseCase } from '../../../domain';
import { AuthorDto, AuthorMapper } from '../../';
import { TYPESDI } from '../../../infraestructure/containers/types';


@injectable()
export class CreateOrUpdateAuthorUseCase implements IUseCase<AuthorDto, AuthorDto>{
    
    constructor( @inject(TYPESDI.IAuthorRepository) private authorRepository: IAuthorRepository ){}

    async execute(dto: AuthorDto): Promise<AuthorDto> {

       const authorBd = await this.authorRepository.createOrUpdateAuthor( dto );

       return AuthorMapper.toDto( authorBd );
    }
}