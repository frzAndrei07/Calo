//Dependencies
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

//Routers
import rootRoutes from './src/routes/rootRoutes.js';

import authRoutes from './src/routes/authRoutes.js';
import authApiRoutes from './src/routes/authApiRoutes.js';

//Middleware
import { verifyToken } from './src/middleware/verifyToken.js';

const app = express();
const port = process.env.PORT;

app.use(cookieParser())

app.use('/', rootRoutes)



app.use('/auth', authRoutes);
app.use('/api/auth', authApiRoutes);

app.use(express.static('public'));

//404
app.use((req, res) => {
    res.status(404).send('404')
})

app.listen(port, () => {
    console.log(`Server up con port ${port}`)
});
