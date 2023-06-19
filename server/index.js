const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { dbConnect } = require('./config/db');
const dotenv = require("dotenv");
const { authRouter } = require('./router/authRouter');
dotenv.config();

dbConnect()
const app = express();
app.use(cors());
app.use(express.json())
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use("/auth", authRouter)

io.on('connection', (socket) => {

    socket.on('sendMessage', (message) => {
        console.log('Gelen mesaj:', message);
        io.to("IvjdHl2fSfo5R8MpAAAf").emit('sendMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı bağlantıyı kopardı');
    });
});

const PORT = 5000;



httpServer.listen(PORT, () => {
    console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});
