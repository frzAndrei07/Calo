import express from 'express';
import 'dotenv/config';
import authRoutes from './src/routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT;

app.use(cookieParser())

app.get('/', (req, res) => {
    res.redirect('/auth/login')
})

app.use(express.static('public'));

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server up con port ${port}`)
});
