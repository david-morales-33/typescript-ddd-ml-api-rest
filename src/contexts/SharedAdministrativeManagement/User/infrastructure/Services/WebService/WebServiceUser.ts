import { AxiosResponse } from "axios";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { WebServiceInterface } from "../../../../../Shared/infrastructure/services/WebService/WebServiceInterface";
import { UserExternalService } from "../../../application/services/UserExternalService";
import { UserExternalServiceDTO } from "../../../domain/data-transfer-objects/UserExternalServiceDTO";
import { WebServiceUserConfigFactory } from "./WebServiceUserConfigFactory";
import { parseString } from 'xml2js';
import { UserExternalServiceMapperDTO, UserServiceObject } from "../Mappers/UserExternalServiceMapperDTO";

export class WebServiceUser extends WebServiceInterface<UserExternalServiceDTO> implements UserExternalService {
    protected serviceName(): string {
        return 'users'
    }
    async find(userId: UserId): Promise<UserExternalServiceDTO[]> {
        const userConfig = WebServiceUserConfigFactory.createConfig(userId.value)
        const response = await this.execute(userConfig);
        // console.log(response)
        return this.convertDataXml2js(response)
    }

    protected convertDataXml2js(response: AxiosResponse): UserExternalServiceDTO[] {
        let data: UserExternalServiceDTO[]=[]
        parseString(response.data, function (_, result) {
            const dataList: UserServiceObject[] = result['soap:Envelope']['soap:Body'][0]['EjecutarConsultaXMLResponse'][0]['EjecutarConsultaXMLResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Resultado'];

            data = dataList.map(UserExternalServiceMapperDTO.convertFromServiceData);
        });
        return data;
    }
}