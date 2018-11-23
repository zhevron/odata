import { AxiosResponse } from "axios";
export declare class ODataResponse<T> {
    private static getMetadata;
    private static getEntity;
    private static getEntities;
    readonly status: number;
    readonly headers: Map<string, string>;
    readonly metadata: Map<string, any>;
    readonly entity: T;
    readonly entities: T[];
    constructor(response: AxiosResponse);
    readonly containsMultipleEntities: boolean;
}
