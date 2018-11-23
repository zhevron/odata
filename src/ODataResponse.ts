import { AxiosResponse } from "axios";

export class ODataResponse<T> {
    private static getMetadata(data: any): Map<string, any> {
        const metadata = new Map<string, any>();
        Object.keys(data)
            .filter((key) => key.startsWith("@odata"))
            .forEach((key) => metadata.set(key.replace("@odata.", ""), data[key]));
        return metadata;
    }

    private static getEntity<T>(data: any): T {
        let entity = {} as T; // tslint:disable-line:prefer-const
        Object.keys(data)
            .filter((key) => !key.startsWith("@odata"))
            .forEach((key) => entity[key as keyof T] = data[key]);
        return entity;
    }

    private static getEntities<T>(data: any): T[] {
        const keys = Object.keys(data).filter((key) => !key.startsWith("@odata"));
        if (keys.length === 1 && keys[0] === "value") {
            return (data.value as T[]);
        }
        return [];
    }

    public readonly status: number;
    public readonly headers: Map<string, string>;
    public readonly metadata: Map<string, any>;
    public readonly entity: T;
    public readonly entities: T[];

    constructor(response: AxiosResponse) {
        this.status = response.status;
        this.headers = response.headers;
        this.metadata = ODataResponse.getMetadata(response.data);
        this.entities = ODataResponse.getEntities(response.data);
        this.entity = this.entities.length === 0 ? ODataResponse.getEntity(response.data) : null;
    }

    public get containsMultipleEntities(): boolean {
        return this.entities.length > 0;
    }
}
