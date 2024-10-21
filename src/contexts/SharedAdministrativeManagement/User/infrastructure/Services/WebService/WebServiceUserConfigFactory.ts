import { EnviromentConfig } from "../../../../../../server/EnviromentConfig";
import { AxiosConfig } from "../../../../../Shared/infrastructure/services/WebService/WebServiceConfig";

export class WebServiceUserConfigFactory {
    static createConfig(user: string): AxiosConfig {
        const env = new EnviromentConfig();
        return {
            data: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\n   
            <soap:Header/>\n   
            <soap:Body>\n<tem:EjecutarConsultaXML>\n
                <!--Optional:-->\n         
                <tem:pvstrxmlParametros>\n         
                <![CDATA[\n<Consulta><NombreConexion>Real</NombreConexion>\n    
                <IdCia>${env.ID_CIA_WS}</IdCia>\n    
                <IdProveedor>${env.ID_PROVEDOR_WS}</IdProveedor>\n    
                <IdConsulta>${env.ID_CONSULTA}</IdConsulta>\n    
                <Usuario>${env.USUARIO_WS}</Usuario>\n    
                <Clave>${env.CLAVE_WS}</Clave>\n    
                <Parametros>\n      
                    <cedula>${user || -1}</cedula>\n    
                </Parametros>\n</Consulta>\n]]>\n         
                </tem:pvstrxmlParametros>\n      
                </tem:EjecutarConsultaXML>\n   
            </soap:Body>\n</soap:Envelope>`
        }
    }
}