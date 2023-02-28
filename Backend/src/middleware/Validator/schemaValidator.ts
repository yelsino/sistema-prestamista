import { NextFunction, Request, Response } from "express";
import { IZodFail } from "types-yola";
import { AnyZodObject, ZodError } from "zod";
import { Respuesta } from "../../models/Respuesta";
import logger from "../../utils/logger";

export const schemaValidator = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      schema.parse({
          body: req.body,
          params: req.params,
          query: req.query,
      });
      next();
  } catch (error) {
    logger.error("ERROR EN ESQUEMA VALIDATOR: "+ error)
    const respuesta = new Respuesta<IZodFail[]>();

      if (error instanceof ZodError) {
          respuesta.ok = false;
          respuesta.data = error.issues.map(({ path, message }) => ({
              atributo: path[1],
              mensaje: message,
          }));
          respuesta.code = 400;
          respuesta.mensaje = "ERROR AL VALIDAR ESQUEMA DE DATOS";

          return res.status(400).json(respuesta);
      }

      return res.status(400).json({ message: "internat server error" });
  }
}