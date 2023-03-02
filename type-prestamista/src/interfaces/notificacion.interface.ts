import { IUsuario } from "./usuario.interface"

export interface IMenaje {
  _id?: string;
  de: IUsuario;
  para: IUsuario;
  mensaje: string;
}

export interface IMensajeToMovil {
  celular: string
  mensaje: string
}


export interface IMensajeToCorreo {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}