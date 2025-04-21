import express, {Application } from 'express';
import routes from './routes';

class App {
    public app: Application;

constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
}

    private middlewares(): void {
        this.app.use(express.json()); // para aceitar JSON
    }

    private routes(): void {
        this.app.use('/', routes);
    }

}

export default new App().app;