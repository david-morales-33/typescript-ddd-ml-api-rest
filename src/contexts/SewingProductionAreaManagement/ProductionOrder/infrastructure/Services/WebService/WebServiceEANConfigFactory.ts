import { EnviromentConfig } from "../../../../../../server/EnviromentConfig";
import { AxiosConfig } from "../../../../../Shared/infrastructure/services/WebService/WebServiceConfig";

export class WebServiceEANConfigFactory {
    static createConfig(params: { reference?: string, colorId?: string, garmentSizeId?: string }): AxiosConfig {
        const { reference, colorId, garmentSizeId } = params;
        const env = new EnviromentConfig();
        return {
            data: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\n   
        <soap:Header/>\n   
        <soap:Body>\n      
        <tem:EjecutarConsultaXML>\n         
        <!--Optional:-->\n         
        <tem:pvstrxmlParametros>\n        
        <![CDATA[\n<Consulta>\n        
            <NombreConexion>Real</NombreConexion>\n        
            <IdCia>${env.ID_CIA_WS}</IdCia>\n        
            <IdProveedor>${env.ID_PROVEDOR_WS}</IdProveedor>\n        
            <IdConsulta>ML_AppML_2_Items_Barras</IdConsulta>\n        
            <Usuario>${env.USUARIO_WS}</Usuario>\n        
            <Clave>${env.CLAVE_WS}</Clave>\n        
            <Parametros>\n        
            <referencia>${reference || -1}</referencia>\n        
            <extension1>${colorId || -1}</extension1>\n        
            <extension2>${garmentSizeId || -1}</extension2>\n        
            </Parametros>\n
            </Consulta>\n         
        ]]>\n         
        </tem:pvstrxmlParametros>\n      
        </tem:EjecutarConsultaXML>\n   
        </soap:Body>\n
        </soap:Envelope>`
        }
    }
}