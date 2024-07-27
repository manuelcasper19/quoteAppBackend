import { Container } from 'inversify';
import { IAuthorRepository, ILiteryWorkDirector, IliteryWorkRepository, IUseCase, LiteryWorkDirector } from '../../domain';
import { AuthorRepositoryImpl, LiteryWorkRepositoryImpl} from '../';
import { LiteryWorkDto, LiteryWorkQueryResultDto, CreateOrUpdateLiteryWorkUseCase, GetLiteryWorkByIdUseCase, GenericLiteryWorkSearchUseCase, SearchParams, AuthorDto, SearchParamsAuthor, GenericFindAuthorUseCase, CreateOrUpdateAuthorUseCase } from '../../application';
import { TYPESDI } from './types'
import { ILiteryWorkBuilder } from '../../domain/entities/builder/iliteryWork';
import { LiteryWorkBuilderImpl } from '../../domain/entities/builder/literyWorkBuilderImpl';

const container = new Container();

container.bind<IliteryWorkRepository>(TYPESDI.IliteryWorkRepository).to(LiteryWorkRepositoryImpl);

container.bind<IUseCase<LiteryWorkDto, LiteryWorkDto>>(TYPESDI.CreateOrUpdateLiteryWorkUseCase).to(CreateOrUpdateLiteryWorkUseCase);

container.bind<IUseCase<string, LiteryWorkDto>>(TYPESDI.GetLiteryWorkByIdUseCase).to(GetLiteryWorkByIdUseCase);

container.bind<IUseCase<SearchParams, LiteryWorkQueryResultDto>>(TYPESDI.GenericLiteryWorkSearchUseCase).to(GenericLiteryWorkSearchUseCase);

container.bind<ILiteryWorkDirector>(TYPESDI.ILiteryWorkDirector).to(LiteryWorkDirector);

container.bind<ILiteryWorkBuilder>(TYPESDI.ILiteryWorkBuilder).to(LiteryWorkBuilderImpl);

container.bind<IAuthorRepository>(TYPESDI.IAuthorRepository).to(AuthorRepositoryImpl);

container.bind<IUseCase<SearchParamsAuthor, AuthorDto | AuthorDto[]>>(TYPESDI.GenericFindAuthorUseCase).to(GenericFindAuthorUseCase);

container.bind<IUseCase<AuthorDto, AuthorDto>>(TYPESDI.CreateOrUpdateAuthorUseCase).to(CreateOrUpdateAuthorUseCase);

export { container };