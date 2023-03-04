
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