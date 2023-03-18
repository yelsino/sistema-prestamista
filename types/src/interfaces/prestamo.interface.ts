import { ICliente } from "./cliente.interface"
import { IMoneda } from "./moneda.interface"
import { IUsuario } from "./usuario.interface";

export interface IPrestamo {
    _id?: string;
    numero: number;
    cliente: ICliente;
    monto: number;
    interes: number;
    montoTotal: number;
    moneda: IMoneda;
    estado: EstadoPrestamo;
    agente: IUsuario;
    numeroCuotas: number;
    formaPago: IFormasPago;
    fechaEmision: Date;
    montoMora: number;
}

type TipoFormaPago =
    | 'DIARIO'
    | 'SEMANAL'
    | 'QUINCENAL'
    | 'MENSUAL'
    | 'ANUAL'

export interface IFormasPago {
    _id?: number;
    nombre: TipoFormaPago;
    dias: number;
}

type EstadoPrestamo =
    | 'PENDIENTE'
    | 'PAGADO'


