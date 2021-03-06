import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ODataRequest } from "./ODataRequest";
import { ODataResponse } from "./ODataResponse";

export class ODataClient {
    public defaultRequestConfig: AxiosRequestConfig;
    private httpClient: AxiosInstance;

    constructor(baseUrl: string, config?: AxiosRequestConfig) {
        this.httpClient = axios.create();
        this.defaultRequestConfig = {
            ...config,
            baseURL: baseUrl,
        };
    }

    public get interceptors() {
        return this.httpClient.interceptors;
    }

    public get<T = any>(entity: string, id?: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, "GET", entity, id);
    }

    public patch<T = any>(entity: string, id: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, "PATCH", entity, id);
    }

    public post<T = any>(entity: string, id?: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, "POST", entity, id);
    }

    public put<T = any>(entity: string, id: number | string): ODataRequest<T> {
        return new ODataRequest(this, this.defaultRequestConfig, "PUT", entity, id);
    }

    public async execute<T = any>(request: ODataRequest<T>): Promise<ODataResponse<T>> {
        try {
            const response = await this.httpClient.request(request.config);
            return new ODataResponse<T>(response);
        } catch (error) {
            throw error;
        }
    }
}
