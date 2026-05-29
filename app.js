//Dependencies
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

//Routers
import rootRoutes from './src/routes/rootRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authApiRoutes from './src/routes/api/authApiRoutes.js';
import rootApiRoutes from './src/routes/api/rootApiRoutes.js';

//Middleware
import { verifyToken } from './src/middleware/verifyToken.js';

const app = express();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

app.use(cookieParser());
app.use(express.json());

app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/api/auth', authApiRoutes);
app.use('/api', rootApiRoutes);

app.use(express.static('public'));

//404
app.use((req, res) => {
    res.status(404).send('404');
})

app.listen(port,() => {
    console.log(`Server up on port ${port}`);
});