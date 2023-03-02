import "dotenv/config";
import { connect } from "mongoose";
import logger from "../utils/logger";
import * as dotenv from 'dotenv' 
dotenv.config()

async function dbConnect(): Promise<void> {
  const DB_URI = <string>process.env.DB_URI;
  await connect(DB_URI);
  logger.info(`Conectado a BD` + DB_URI);
}

export default dbConnect;


