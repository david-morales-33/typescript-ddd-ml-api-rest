import { Router } from 'express';
import { AuthenticationRoutes } from './routes/index.routes';

export class AuthenticationBackendApp {
    public router = Router();
    private authenticationRoutes = new AuthenticationRoutes();

    constructor(){
        this.register()
    }

    private register() {
        this.router.use('/api/ml/authenticacion/', this.authenticationRoutes.router);
    }
}