import { WebServiceFactory } from "./WebServiceFactory";
import { AxiosResponse } from 'axios'
import axios from 'axios'
import { ServiceResponse } from "./ServiceResponse";
import { AxiosConfig } from "./WebServiceConfig";

export abstract class WebServiceInterface<R extends ServiceResponse> {
    protected abstract serviceName(): string;
    protected abstract convertDataXml2js(response: AxiosResponse): R[];

    protected async execute(config: AxiosConfig): Promise<AxiosResponse> {
        const service = WebServiceFactory.createConnection(this.serviceName(), config);
        return await axios(service);
    }
}