import cors from 'cors';
import express from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routers api
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'app successfully running',
  });
});

export default app;
