import { AxiosRequestConfig } from 'axios'
import { AxiosConfig } from './WebServiceConfig';
import { EnviromentConfig } from '../../../../../server/EnviromentConfig';

export class WebServiceFactory {
    private static services: { [key: string]: AxiosRequestConfig } = {}

    static createConnection(serviceName: string, config: AxiosConfig): AxiosRequestConfig {
        // let connectionConfig = WebServiceFactory.getService(serviceName);
        // if (!connectionConfig) {
            const connectionConfig = WebServiceFactory.createConnectionConfig(config)
            WebServiceFactory.registerService(serviceName, connectionConfig);
        // }
        return connectionConfig;
    }

    private static createConnectionConfig(config: AxiosConfig): AxiosRequestConfig {
        const env = new EnviromentConfig();
        return {
            method: 'post',
            url: env.URL_WS,
            headers: {
                "Content-Type": 'text/xml;charset=UTF-8',
                'SOAPAction': 'http://tempuri.org/EjecutarConsultaXML'
            },
            data: config.data
        };
    }

    private static getService(service: string): AxiosRequestConfig | null {
        return WebServiceFactory.services[service];
    }

    private static registerService(service: string, config: AxiosRequestConfig) {
        WebServiceFactory.services[service] = config;
    }
}