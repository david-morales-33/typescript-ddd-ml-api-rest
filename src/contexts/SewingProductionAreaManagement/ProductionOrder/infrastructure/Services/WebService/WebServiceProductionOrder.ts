import { AxiosResponse } from "axios";
import { WebServiceInterface } from "../../../../../Shared/infrastructure/services/WebService/WebServiceInterface";
import { ProductionOrderExternalServiceDTO } from "../../../application/data-transfer-objects/ProductionOrderExternalServiceDTO";
import { ProductionOrderExternalService } from "../../../application/services/ProductionOrderExternalService";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { parseString } from 'xml2js';
import { ProductionOrderExternalServiceMapperDTO, ProductionOrderServiceObject } from "../Mappers/ProductionOrderExternalServiceMapperDTO";
import { WebServiceProductionOrderConfigFactory } from "./WebServiceProductionOrderConfigFactory";

export class WebServiceProductionOrder extends WebServiceInterface<ProductionOrderExternalServiceDTO> implements ProductionOrderExternalService {

    protected serviceName(): string {
        return 'productionOrderList'
    }

    async find(productionOderId: ProductionOrderId): Promise<ProductionOrderExternalServiceDTO[]> {
        const data = WebServiceProductionOrderConfigFactory.createConfig(productionOderId.value)
        const response = await this.execute(data);
        return this.convertDataXml2js(response);
    }

    async getAll(): Promise<ProductionOrderExternalServiceDTO[]> {
        const data = WebServiceProductionOrderConfigFactory.createConfig()
        const response = await this.execute(data);
        return this.convertDataXml2js(response);
    }

    protected convertDataXml2js(response: AxiosResponse): ProductionOrderExternalServiceDTO[] {
        let data: ProductionOrderExternalServiceDTO[] = [];

        parseString(response.data, function (_, result) {
            const dataList: ProductionOrderServiceObject[] = result['soap:Envelope']['soap:Body'][0]['EjecutarConsultaXMLResponse'][0]['EjecutarConsultaXMLResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Resultado'];

            data = dataList.map(ProductionOrderExternalServiceMapperDTO.convertFromServiceDate);
        });

        return data;
    }
}