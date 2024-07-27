import { Container } from 'inversify';
import { ILiteryWorkDirector, IliteryWorkRepository, IUseCase, LiteryWorkDirector } from '../../domain';
import { LiteryWorkRepositoryImpl} from '../';
import { LiteryWorkDto, LiteryWorkQueryResultDto, CreateOrUpdateLiteryWorkUseCase, GetLiteryWorkByIdUseCase, GenericLiteryWorkSearchUseCase, SearchParams } from '../../application';
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

export { container };