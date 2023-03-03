import { ICliente } from "./cliente.interface"
import { IUsuario } from "./usuario.interface";

export interface ICuota {
    cliente: ICliente;
    agente: IUsuario;
    fechaPago: Date;
    monto: number;
}
