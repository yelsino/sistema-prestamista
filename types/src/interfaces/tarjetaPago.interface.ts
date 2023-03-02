import { IUsuario } from "./usuario.interface";

export interface ITarjetaPago {
  _id?: string;
  titular: string;
  numero: string;
  expiracion: Date;
  cliente: IUsuario;
}
