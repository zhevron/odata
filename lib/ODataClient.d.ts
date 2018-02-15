import { AxiosRequestConfig } from "axios";
import { ODataRequest } from "./ODataRequest";
import { ODataResponse } from "./ODataResponse";
export declare class ODataClient {
    defaultRequestConfig: AxiosRequestConfig;
    private cancelTokenSource;
    private httpClient;
    constructor(baseUrl: string, config?: AxiosRequestConfig);
    get<T = any>(entity: string, id?: number | string): ODataRequest<T>;
    execute<T = any>(request: ODataRequest<T>): Promise<ODataResponse<T>>;
    cancelAllRequests(message?: string): void;
}
