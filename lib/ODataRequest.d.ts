import { AxiosRequestConfig } from "axios";
import { ODataClient } from "./ODataClient";
import { ODataResponse } from "./ODataResponse";
export declare class ODataRequest<T> {
    config: AxiosRequestConfig;
    private cancelTokenSource;
    private client;
    constructor(client: ODataClient, config: AxiosRequestConfig, method: string, entity: string, id?: number | string);
    clone(): ODataRequest<T>;
    select(...props: string[]): ODataRequest<T>;
    expand(...props: string[]): ODataRequest<T>;
    filter(filter: string): ODataRequest<T>;
    ref(nevigationProperty: string, entity: string, id: number | string): ODataRequest<T>;
    body(body: Partial<T>): ODataRequest<T>;
    execute(): Promise<ODataResponse<T>>;
    cancel(message?: string): void;
}
