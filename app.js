import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import ace from 'atlassian-connect-express';
import hbs from 'express-hbs';
import http from 'http';
import path from 'path';
import * as sqlite3 from 'sqlite3';
import * as pg from 'pg';
import helmet from 'helmet';
import nocache from 'nocache';
import routes from './routes';
import { addServerSideRendering } from './server-side-rendering';
import atlassianConnectFactory from './atlassian-connect-factory';

const app = express();

atlassianConnectFactory()

const addon = ace(app, {
  config: {
    development: {
      port: 3000,
      errorTemplate: true,
      store: {
        adapter: 'sequelize',
        dialect: 'sqlite3',
        logging: false,
        type: 'memory'
      }
    },
    production: {
      environment: 'production',
      port: process.env.PORT,
      store: {
        adapter: 'sequelize',
        dialect: 'postgres',
        url: process.env.DATABASE_URL
      },
      errorTemplate: true,
      localBaseUrl: process.env.BASE_URL,
      product: 'confluence'
    }
  }
});


const port = addon.config.port();
app.set('port', port);

const devEnv = app.get('env') === 'development';
app.use(morgan(devEnv ? 'dev' : 'combined'));

const viewsDir = path.join(__dirname, 'views');
const handlebarsEngine = hbs.express4({partialsDir: viewsDir});
app.engine('hbs', handlebarsEngine);
app.set('view engine', 'hbs');
app.set('views', viewsDir);

addServerSideRendering(app, handlebarsEngine);

app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: false
}));
app.use(helmet.referrerPolicy({
  policy: ['origin']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(addon.middleware());

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.use(nocache());

if (devEnv) app.use(errorHandler());

routes(app, addon);

http.createServer(app).listen(port, () => {
  if (devEnv) addon.register();
});