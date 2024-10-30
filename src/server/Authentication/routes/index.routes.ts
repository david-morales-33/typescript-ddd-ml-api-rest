import { Router } from 'express';

export class AuthenticationRoutes {
    public router = Router();

    constructor() {
        this.register();
    }

    private register() {
        this.router.use('/auth-by-credentials', () => { })
        this.router.use('/auth-by-token', () => { })
    }
}