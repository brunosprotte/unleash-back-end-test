import express from 'express';
import {initialize, Strategy} from 'unleash-client';

import 'express-async-errors';
import routes from './routes';

const app = express();

const instance = initialize({
    appName: 'demo-app',
    url: 'http://localhost:4242/api',
    refreshInterval: 1000,
    metricsInterval: 500,
    strategies: [
        new Strategy('extra', true),
    ],
});

instance.on('ready', console.log);
instance.on('synchronized', console.log);
instance.on('error', console.error);
instance.on('warn', console.warn);

/* Metric Hooks */
instance.on('registered', clientData => { console.log('registered', clientData) })
instance.on('sent', payload => console.log('metrics bucket/payload sent', payload))
instance.on('changed', clientData => { console.log('changed', clientData) })
instance.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`))

// app.use(cors());
app.use(express.json());
app.use(routes);
// app.use(errorHandler);

app.listen(3333, () =>{
    console.log('server started at 3333')
});