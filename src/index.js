const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-tjkw1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

// informação em tempo real para o frontend em todas as rotas
app.use((req, res, next) => {
    req.io = io;

    next();
})
// permitir todas as urls de diferentes servidores possam acessar esse backend
app.use(cors());

// rota para acessar arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// rotas da aplicação
app.use(require('./routes'));

app.listen(3333);