import express from 'express';
import mongoose from 'mongoose';
import server, { Server } from 'http';

class App {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly server: Server;

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.server = server.createServer(this.app);

    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);
    this.assets();
    this.databaseConnection();
  }

  private middlewares(middlewares: {
    forEach: (mw: (middleWare: any) => void) => void;
  }) {
    middlewares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (ctrl: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private async databaseConnection() {
    try {
      await mongoose.connect(<string>process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      console.log('MONGO_DB: SUCCESS');
    } catch (e) {
      console.error(e);
    }
  }

  private assets() {
    this.app.use(express.static('public'));
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`NODEJS: App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
