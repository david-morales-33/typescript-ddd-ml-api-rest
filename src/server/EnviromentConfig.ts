import path from 'path'
import dotenv from 'dotenv'

const envPath = path.join(__dirname, '../..', '.env');
envPath ? dotenv.config({ path: envPath }) : dotenv.config()

export class EnviromentConfig {

    public readonly SERVER_PORT: string;
    public readonly DB_PORT: string;
    public readonly DB_HOST: string;
    public readonly DB_USER: string;
    public readonly DB_PASSWORD: string;
    public readonly DB_DATABASE: string;
    public readonly URL_WS: string;
    public readonly CLAVE_WS: string;
    public readonly ID_CIA_WS: string;
    public readonly USUARIO_WS: string;
    public readonly ID_PROVEDOR_WS: string;
    public readonly ID_CONSULTA: string;

    constructor() {
        this.SERVER_PORT = this.envValueValidator('SERVER_PORT');
        this.DB_PORT = this.envValueValidator('DB_PORT');
        this.DB_HOST = this.envValueValidator('DB_HOST');
        this.DB_USER = this.envValueValidator('DB_USER');
        this.DB_PASSWORD = this.envValueValidator('DB_PASSWORD');
        this.DB_DATABASE = this.envValueValidator('DB_DATABASE');
        this.URL_WS = this.envValueValidator('URL_WS');
        this.CLAVE_WS = this.envValueValidator('CLAVE_WS');
        this.ID_CIA_WS = this.envValueValidator('ID_CIA_WS');
        this.USUARIO_WS = this.envValueValidator('USUARIO_WS');
        this.ID_PROVEDOR_WS = this.envValueValidator('ID_PROVEDOR_WS');
        this.ID_CONSULTA = this.envValueValidator('ID_CONSULTA')
    }

    protected envValueValidator(name: string): string {
        const value = process.env[name]
        if (!value)
            throw new Error(`La variable de entorno ${name}, no fue proporcionada`)
        return value;
    }
}

