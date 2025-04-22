import express, {Application } from 'express';
import routes from './routes';
import clienteRoute from './routes/clientesRoutes'
import mesaRoute from './routes/mesaRoutes'
import reservaRoutes from './routes/reservaRoute'

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
        this.app.use('/clientes', clienteRoute);
        this.app.use('/mesas', mesaRoute );
        this.app.use('/reservas', reservaRoutes );

    }

}

export default new App().app;