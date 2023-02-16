import 'dotenv/config';
import express from 'express';
import { json, urlencoded } from 'body-parser';
const app = express();
import router from './route';

app.use(
    urlencoded({
      extended: true,
    }),
  );

  app.use(json());

app.use('/api', router);

const PORT = process.env.PORT;
app.listen(PORT, (err, conn) => {
    if(err) { throw err }
    console.log('app is running on port: ', PORT);
});
