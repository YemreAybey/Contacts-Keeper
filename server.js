import express from 'express';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import contactsRoutes from './routes/contacts.js';
import connectDb from './config/db.js';
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
