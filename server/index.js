const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require('cors');

// enable app to use CORS
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection" , (socket) =>{
    console.log(`USER CONNECTED ${socket.id}`);
    
    // join a room
    socket.on("join_room", (roomId) =>{
        socket.join(roomId);
    })

    socket.on("send_message", (data) =>{
        console.log(data);

        // broadcast to every user but urself
        socket.to(data.room).emit("receive_message", {message: data.message});
    })

    // handle the emit
    // socket.on("send_message", (data) =>{
    //     console.log(data);

    //     // broadcast to every user but urself
    //     socket.broadcast.emit("receive_message", {message: data.message});
    // })
});

server.listen(3001, () =>{
    console.log('SERVER is RUNNING');
})



