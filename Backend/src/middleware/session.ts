import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { Respuesta } from "../models/Respuesta";
import { verifyToken } from "../utils/jwt.handle";
import logger from "../utils/logger";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {


  const respuesta = new Respuesta<boolean>()

  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); 
    const isUser = verifyToken(`${jwt}`) as { id: string };
    
    console.log("USER: ", isUser);
    
    if (!isUser) {
      res.status(401);
      res.send({...respuesta, ok: false, code: 401, message: "SESSION_NO_VALIDAD"});
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    logger.info("ERROR AL VALIDAR TOKEN"+ e)
    res.send({...respuesta, ok: false, code: 500, message: "ERROR AL VALIDAR TOKEN"});
  }
};

export { checkJwt };
