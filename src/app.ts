import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial');
})

app.listen(port , () => {
    console.log(`Servidor sendo executado em: http://localhost:${port}`)
})
