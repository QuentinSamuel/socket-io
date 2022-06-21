const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();

// use some application-level middlewares
const corsOptions = {
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = socketIO(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.warn("a user connected");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.warn("user disconnected");
  });
});

// const getMsgAndEmit = (socket) => {
//   const response = New Msg()
//   socket.emit("Fromapi", response);
// };

// io.on("connection", (socket) => {
//   console.warn("msg from frontend");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => {
//     getApiAndEmit(socket);
//   }, 1000);
//   socket.on("disconnect from msg", () => {
//     console.warn("user who send msg disconnected");
//     clearInterval(interval);
//   });
// });

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
/* app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
  );
}); */

// ready to export
module.exports = server;
