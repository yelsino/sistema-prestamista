import { IUsuario } from "./usuario.interface";

export interface ICodigoTemporal {
  _id?: string;
  codigo: string;
  usuario?: IUsuario;
  tipo: Tipo
  estado?: boolean
}

type Tipo = 'EMAIL' | 'MOVIL'