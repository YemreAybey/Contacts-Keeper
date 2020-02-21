import express from 'express';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import contactsRoutes from './routes/contacts';
import connectDb from './config/db';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
