import { AxiosResponse } from "axios";
export declare class ODataResponse<T> {
    private static getMetadata(data);
    private static getEntity<T>(data);
    private static getEntities<T>(data);
    readonly status: number;
    readonly headers: Map<string, string>;
    readonly metadata: Map<string, any>;
    readonly entity: T;
    readonly entities: T[];
    constructor(response: AxiosResponse);
    readonly containsMultipleEntities: boolean;
}
