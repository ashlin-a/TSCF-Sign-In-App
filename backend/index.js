import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';


const app = express();
const port = 3000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);


  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

