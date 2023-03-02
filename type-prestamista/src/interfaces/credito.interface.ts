import { IAbonoCredito } from "./abonoCredito.interface";
import { IUsuario } from "./usuario.interface";

export interface ICredito {
  _id?: string;
  cliente: IUsuario;
  evidencias: Array<string>;
  codigo: string;
  monto: number;
  abono: IAbonoCredito;
  tipoPago: string;
}
