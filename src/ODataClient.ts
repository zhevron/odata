import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";
import { ODataRequest } from "./ODataRequest";
import { ODataResponse } from "./ODataResponse";

export class ODataClient {
    public defaultRequestConfig: AxiosRequestConfig;
    private cancelTokenSource: CancelTokenSource;
    private httpClient: AxiosInstance;

    constructor(baseUrl: string, config?: AxiosRequestConfig) {
        this.cancelTokenSource = axios.CancelToken.source();
        this.httpClient = axios.create();
        this.defaultRequestConfig = {
            ...config,
            baseURL: baseUrl,
            cancelToken: this.cancelTokenSource.token,
        };
    }

    public get<T = any>(entity: string, id?: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, "GET", entity, id);
    }

    /*post<T = any>(entity: string, id?: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, 'POST', entity, id);
    }*/

    /*put<T = any>(entity: string, id: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, 'PUT', entity, id);
    }*/

    public async execute<T = any>(request: ODataRequest<T>): Promise<ODataResponse<T>> {
        try {
            const response = await this.httpClient.request(request.config);
            return new ODataResponse<T>(response);
        } catch (error) {
            throw error;
        }
    }

    public cancelAllRequests(message?: string): void {
        this.cancelTokenSource.cancel(message);
    }
}
