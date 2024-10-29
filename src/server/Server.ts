import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as http from 'http';
import { SewingProductionAreaBackendApp } from './SewingProductionAreaManagement/SewingProductionAreaBackendApp';
import { AuthenticationBackendApp } from './Authentication/AuthenticationBackendApp';
import { PlatformsBackendApp } from './Platforms/PlatformsBackendApp';
import { SharedAdministrativeBackendApp } from './SharedAdministrativeManagement/SharedAdministrativeBackendApp';
import { SewingProductionReportsBackendApp } from './SewingProductionReportsManagement/SewingProductionReportsBackendApp';
import { SewingProductionAdministrativeBackendApp } from './SewingProductionAdministrativeManagement/SewingProductionAdministrativeBackendApp';

export class Server {
    private app: express.Express;
    private port: string;
    private httpServer?: http.Server;
    private sewingProductionAdministrativeBackendApp = new SewingProductionAdministrativeBackendApp();
    private sewingProductionReportsBackendApp = new SewingProductionReportsBackendApp();
    private sewingProductionAreaBackendApp = new SewingProductionAreaBackendApp();
    private sharedAdministrativeBackendApp = new SharedAdministrativeBackendApp()
    private authenticationBackendApp = new AuthenticationBackendApp();
    private platformsBackendApp = new PlatformsBackendApp();

    constructor(port: string) {
        this.port = port;
        this.app = express();
        this.config(this.app)
    }

    private config(app: express.Express): void {

        app.use(this.sewingProductionAdministrativeBackendApp.router)
        app.use(this.sewingProductionReportsBackendApp.router);
        app.use(this.sewingProductionAreaBackendApp.router);
        app.use(this.sharedAdministrativeBackendApp.router);
        app.use(this.authenticationBackendApp.router);
        app.use(this.platformsBackendApp.router);

        const corsConfig: CorsOptions = { origin: "http://localhost:3000", credentials: true };

        app.use(cors(corsConfig));
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));
    }

    getHTTPServer() {
        return this.httpServer;
    }

    async listen(): Promise<void> {
        return new Promise(resolve => {
            this.httpServer = this.app.listen(this.port, () => {
                console.log(
                    ` Backend App is running at http://localhost:${this.port} in ${this.app.get('env')} mode`
                );
                console.log('  Press CTRL-C to stop\n');
                resolve();
            });
        });
    }
}