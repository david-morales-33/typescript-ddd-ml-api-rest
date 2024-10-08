import { WebServiceProductionOrderConfigFactory } from "../../../../SewingProductionAreaManagement/ProductionOrder/infrastructure/Services/WebService/WebServiceProductionOrderConfigFactory";
import { WebServiceFactory } from "./WebServiceFactory";
import { AxiosResponse } from 'axios'
import axios from 'axios'
import { ServiceResponse } from "./ServiceResponse";

export abstract class WebServiceInterface<R extends ServiceResponse> {
    protected abstract serviceName(): string;
    protected abstract convertDataXml2js(response: AxiosResponse): R[];

    protected async execute(productionOrderId?: string): Promise<AxiosResponse> {
        const config = WebServiceProductionOrderConfigFactory.createConfig(productionOrderId);
        const service = WebServiceFactory.createConnection(this.serviceName(), config);
        return await axios(service);
    }
}