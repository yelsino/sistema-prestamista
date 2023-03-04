import { Twilio } from "twilio";
import { CodigoTemporalService } from "./codigoTemporal.service";
import * as nodemailer from 'nodemailer';

import logger from "../utils/logger";
import { IMensajeToCorreo, IMensajeToMovil } from "types-prestamista";

export class NotificacionService {
  codigoService: CodigoTemporalService;
  constructor() {
    this.codigoService = new CodigoTemporalService();
  }

  enviarNotificacionMovil = ({ celular, mensaje }: IMensajeToMovil) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_NUMBER;

    if (accountSid && authToken && celular && twilioNumber) {
      const client = new Twilio(accountSid, authToken);

      return client.messages
        .create({
          from: twilioNumber,
          to: `+51${celular}`,
          body: mensaje,
        })
        .then((response) => {
          if (response.sid) {
            return true;
          }
          return false;
        })
        .catch((error) => {
          logger.info("OCURRIO UN ERRO AL ENVIAR NOTIFICACION: " + error)
        });
    }
  };
  // enviar notificacion por correo con nodemailer
  enviarNotificacionCorreo = async (message: IMensajeToCorreo) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'yelsinkuro@gmail.com',
          pass: 'jdvcyqgzmmvuprle'
        }
      });

      const result = await transporter.sendMail(message);
      return result.rejected.length === 0;
    } catch (error) {
      logger.error("ERROR AL ENVIAR CORREO: " + error);
    }
  };

 
}
