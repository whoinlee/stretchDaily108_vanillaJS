const path = require("path"); //nodeJS module
//-- step2 w. server
const http = require("http"); //nodeJS module/package
//-- step3 w. socket.io
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

//-- step1
const express = require("express");
const app = express();
//-- set static folder
app.use(express.static(path.join(__dirname, "public")));

//-- step2 w. server
const server = http.createServer(app);

//-- setp3 w. socket.io
const io = socketio(server); /****/

const botName = "ChatCord Bot";

//-- run when client connects
io.on("connection", (socket) => {
  console.log("new websocket connects!!!");
  //-- testing
  // socket.emit("message", "Welcome to this chat world!!");

  //-- listen for "joinRoom"
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    console.log(username + " connected");
    socket.join(user.room);

    //-- welcome current user, emit to a single client connecting
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    //-- broadcast, when a user connects, to all of the clients except the user connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    //-- send users and room info, to all the clients including the user
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //-- listen for "chatMessage"
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //-- runs when client "disconnects"
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      console.log(user.username + " disconnected");

      //-- to everyone
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      //-- send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
//-- step1
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//-- step2. w. server after it's set
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
