import { Container } from 'inversify';
import { ILiteryWorkDirector, IliteryWorkRepository, IUseCase, LiteryWorkDirector } from '../../domain';
import { LiteryWorkRepositoryImpl } from '../';
import { LiteryWorkDto, LiteryWorkQueryResultDto, CreateOrUpdateLiteryWorkUseCase, GetLiteryWorkByIdUseCase, GenericLiteryWorkSearchUseCase, SearchParams } from '../../application';

export const TYPES = {
    IliteryWorkRepository: Symbol.for("IliteryWorkRepository"),
    ILiteryWorkDirector: Symbol.for("ILiteryWorkDirector"),
    CreateOrUpdateLiteryWorkUseCase: Symbol.for("CreateOrUpdateLiteryWorkUseCase"),
    GetLiteryWorkByIdUseCase: Symbol.for("GetLiteryWorkByIdUseCase"),
    GenericLiteryWorkSearchUseCase: Symbol.for("GenericLiteryWorkSearchUseCase")
  };

const container = new Container();

container.bind<IliteryWorkRepository>(TYPES.IliteryWorkRepository).to(LiteryWorkRepositoryImpl);

container.bind<IUseCase<LiteryWorkDto, LiteryWorkDto>>(TYPES.CreateOrUpdateLiteryWorkUseCase).to(CreateOrUpdateLiteryWorkUseCase);

container.bind<IUseCase<string, LiteryWorkDto>>(TYPES.GetLiteryWorkByIdUseCase).to(GetLiteryWorkByIdUseCase);

container.bind<IUseCase<SearchParams, LiteryWorkQueryResultDto>>(TYPES.CreateOrUpdateLiteryWorkUseCase).to(GenericLiteryWorkSearchUseCase);

container.bind<ILiteryWorkDirector>(TYPES.ILiteryWorkDirector).to(LiteryWorkDirector);

export { container };