import { IUsuario } from "./usuario.interface";

export interface IVentaLocal {
  _id?: string;
  monto: number;
  vendedor: IUsuario;
  comprador: IUsuario;
  evidencias: Array<string>;
}
