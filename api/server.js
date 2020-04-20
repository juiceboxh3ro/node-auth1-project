const express = require("express");
const cors = require("cors");
const session = require('express-session')

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const authMiddleware = require ('../auth/authenticator')

const server = express();

const sessionConfig = {
  name: 'monster',
  secret: process.env.SESSION_SECRET || 'keep it secret keep it safe',
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 30, // 1000 * 60 * 60 * 24 * 7 * 4 // one month
    secure: process.env.USE_SECURE_COOKIES || false, // http or https
    httpOnly: true, // can JS access the cookie (true means no)
  }
}

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use("/api/users", authMiddleware, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
