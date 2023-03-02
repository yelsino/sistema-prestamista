import { IDireccion } from "./direccion.interface";
import { ILista } from "./lista.interface";
import { IUsuario } from "./usuario.interface";

export interface IPedido {
  _id?: string;
  numero: string;
  codigo: string;
  direccion: IDireccion;
  estado: EstadoPedido;
  total: number;
  subTotal: number;
  montoDescuento: number;
  porcentajeDescuento: number;
  usuario: IUsuario;
  lista: ILista;
  pedidoDetalle: IPedidoDetalle;
  fechaEntrega: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPedidoDetalle {
  _id?: string
  detalleLista: ILista
  detalleDireccion: IDireccion
  detalleUsuario: IUsuario
  total: number
}


export type EstadoPedido =
  | 'RECIBIDO'
  | 'PREPARANDO'
  | 'ENVIADO'
  | 'ENTREGADO'
  | 'RECLAMO'