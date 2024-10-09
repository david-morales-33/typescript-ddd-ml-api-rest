import { AxiosResponse } from "axios";
import { WebServiceInterface } from "../../../../../Shared/infrastructure/services/WebService/WebServiceInterface";
import { parseString } from 'xml2js';
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderEanExternalServiceDTO } from "../../../application/data-transfer-objects/ProductionOrderEanExternalServiceDTO";
import { ProductionOrderEanExternalService } from "../../../application/services/ProductionOrderEanExternalService";
import { WebServiceEANConfigFactory } from "./WebServiceEANConfigFactory";
import { ProductionOrderEanExternalServiceMapperDTO, ProductionOrderEanServiceObject } from "../Mappers/ProductionOrderEanExternalServiceMapperDTO";

export class WebServiceEAN extends WebServiceInterface<ProductionOrderEanExternalServiceDTO> implements ProductionOrderEanExternalService {

    protected serviceName(): string {
        return 'ProductionOrderEANList'
    }

    async match(params: { reference?: any; colorId?: ColorId; garmentSize?: GarmentSize; }): Promise<ProductionOrderEanExternalServiceDTO[]> {
        const { reference, colorId, garmentSize } = params;
        const data = WebServiceEANConfigFactory.createConfig({
            garmentSizeId: garmentSize?.value,
            colorId: colorId?.value,
            reference: reference
        });
        const response = await this.execute(data)
        return this.convertDataXml2js(response);
    }

    protected convertDataXml2js(response: AxiosResponse): ProductionOrderEanExternalServiceDTO[] {
        let data: ProductionOrderEanExternalServiceDTO[]=[]
        parseString(response.data, function (_, result) {
            const dataList: ProductionOrderEanServiceObject[] = result['soap:Envelope']['soap:Body'][0]['EjecutarConsultaXMLResponse'][0]['EjecutarConsultaXMLResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Resultado'];

            data = dataList.map(ProductionOrderEanExternalServiceMapperDTO.convertFromServiceData);
        });
        return data;
    }
}