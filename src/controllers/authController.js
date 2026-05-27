import path from 'path';

export const authGet = (req, res) => {
    console.log('login get');
    res.sendFile(path.resolve('public/auth/index.html'));
}