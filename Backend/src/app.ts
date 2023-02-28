 // 🚀🚀🚀🚀🚀🚀🚀🚀
import config from "config";
// import "dotenv/config";
import express from "express";
import logger from "./utils/logger";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import db from "./config/mongo";
import { generarData } from "./libs";
import { router } from "./routes";
import socket from "./socket";

import * as dotenv from 'dotenv' 
dotenv.config()

const PORT = config.get<number>("port");
const HOST = config.get<string>("host");
const CORS = config.get<string>("corsOrigin");

const app = express();

app.use(cors());
app.use(express.static('src/public'))
app.use(express.json());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: CORS,
    credentials: true,
  },
});

const SERVER_PORT = process.env.PORT || PORT

app.get("/", (_, res) =>
  res.send(`Server is up and running version `)
);
app.use(router);-

db()
.then(() => generarData())
.then(() => {
  httpServer.listen(Number(SERVER_PORT), () => {
    logger.info(`Server version 1.0.0 is listening`);
    logger.info(`http://${HOST}:${SERVER_PORT}`);
  
    socket({ io });
  });
});

