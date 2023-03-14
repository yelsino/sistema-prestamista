import { ICliente } from "./cliente.interface"
import { IPrestamo } from "./prestamo.interface";
import { IUsuario } from "./usuario.interface";

export interface ICuota {
    _id?: string;
    cliente: ICliente;
    agente: IUsuario;
    fechaPago: Date;
    fechaLimite: Date;
    prestamo: IPrestamo;
    monto: number;
    estado: EstadoCuota;
    numeroCuota: number;
}

type EstadoCuota =
    | 'PENDIENTE'
    | 'PAGADO'