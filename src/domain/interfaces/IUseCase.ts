export interface IUseCase<TRequest, TResponse> {

    execute( tRequest: TRequest ): Promise<TResponse>;
}