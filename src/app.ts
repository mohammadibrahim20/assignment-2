import cors from 'cors';
import express from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'app successfully running',
  });
});

export default app;
