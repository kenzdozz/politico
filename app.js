import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { officeRoutes, partyRoutes } from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).send({ message: 'YAY! Congratulations bro! Your first endpoint is working' }));

app.use('/api/v1/parties', partyRoutes);
app.use('/api/v1/offices', officeRoutes);

app.listen(3000);

// eslint-disable-next-line no-console
console.log('app running on port ', 3000);

export default app;
