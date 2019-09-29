import { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from "axios";
import { ODataRequest } from "./ODataRequest";
import { ODataResponse } from "./ODataResponse";
export declare class ODataClient {
    defaultRequestConfig: AxiosRequestConfig;
    private httpClient;
    constructor(baseUrl: string, config?: AxiosRequestConfig);
    readonly interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<any>>;
    };
    get<T = any>(entity: string, id?: number | string): ODataRequest<T>;
    patch<T = any>(entity: string, id: number | string): ODataRequest<T>;
    post<T = any>(entity: string, id?: number | string): ODataRequest<T>;
    put<T = any>(entity: string, id: number | string): ODataRequest<T>;
    execute<T = any>(request: ODataRequest<T>): Promise<ODataResponse<T>>;
}
