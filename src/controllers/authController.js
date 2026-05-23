import path from 'path';

export const loginGet = (req, res) => {
    console.log('login Get');
    res.sendFile(path.resolve('public/auth/index.html'));
} 