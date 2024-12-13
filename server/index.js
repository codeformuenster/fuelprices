import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import connectDB from './mongodb/connect.js';
import routes from './routes/index.js';
import './cron.js';

dotenv.config();

const app = express();
app.use(cors()); // to allow cross origin requests
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use('/api/v1/', routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const startServer = async () => {
  console.group('start server');
  try {
    if (process.env.MONGODB_URL !== '') {
      connectDB(process.env.MONGODB_URL).catch(console.log);
    }

    app.listen(process.env.PORT, () => {
      console.log(process.env.ENVIRONMENT_INFO);
      console.log(`Server has started at at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.groupEnd();
  }
};

startServer();