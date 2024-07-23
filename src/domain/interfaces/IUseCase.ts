export interface IUseCase<TRequest, TResponse> {

    execute( tRequest: TRequest ): TResponse;
}