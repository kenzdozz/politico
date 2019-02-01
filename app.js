import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { officeRoutes, partyRoutes, authRoutes } from './routes';
import codes from './helpers/statusCode';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(codes.success).send({
  status: codes.success,
  data: [{
    message: 'The app is running',
  }],
}));

app.use('/api/v1/parties', partyRoutes);
app.use('/api/v1/offices', officeRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT);

// eslint-disable-next-line no-console
console.log('app running on port ', PORT);
export default app;
