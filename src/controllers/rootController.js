import path from 'path';

export const rootGet = (req, res) => {
    console.log('root get')
    res.sendFile(path.resolve('public/index.html'));
}