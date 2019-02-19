import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import codes from './helpers/statusCode';
import {
  officeRoutes, partyRoutes, authRoutes, userRoutes,
  candidateRoutes, voteRoutes, otherRoutes,
} from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.status(codes.success).send({
  status: codes.success,
  data: {
    message: 'The app is running',
  },
}));

app.use('/api/v1/parties', partyRoutes);
app.use('/api/v1/offices', officeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/votes', voteRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1', otherRoutes);

app.get('*', (req, res) => res.status(codes.notFound).send({
  status: codes.notFound,
  error: 'Page not found.',
}));


app.listen(PORT);

// eslint-disable-next-line no-console
console.log('app running on port ', PORT);
export default app;
