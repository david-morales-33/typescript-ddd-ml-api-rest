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

    constructor() {
        this.SERVER_PORT = this.envValueValidator('SERVER_PORT');
        this.DB_PORT = this.envValueValidator('DB_PORT');
        this.DB_HOST = this.envValueValidator('DB_HOST');
        this.DB_USER = this.envValueValidator('DB_USER');
        this.DB_PASSWORD = this.envValueValidator('DB_PASSWORD');
        this.DB_DATABASE = this.envValueValidator('DB_DATABASE');

        // console.log(envPath)
    }
    
    protected envValueValidator(name: string): string {
        const value = process.env[name]
        if (!value)
            throw new Error(`La variable de entorno ${name}, no fue proporcionada`)
        return value;
    }
}

