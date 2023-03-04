import { ICliente } from "./cliente.interface"
import { IUsuario } from "./usuario.interface";

export interface ICuota {
    _id?: string;
    cliente: ICliente;
    agente: IUsuario;
    fechaPago: Date;
    monto: number;
}
