import { ICliente } from "./cliente.interface"
import { IMoneda } from "./moneda.interface"
import { IUsuario } from "./usuario.interface";

export interface IPrestamo {
    numero: number;
    cliente: ICliente;
    monto: number;
    interes: number;
    montoTotal: number;
    moneda: IMoneda;
    estado: string;
    agente: IUsuario
}