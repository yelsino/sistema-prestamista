import { IPedido } from "./pedido.interface";
import { IUsuario } from "./usuario.interface";

export interface IReclamo {
  _id?: string
  asunto: string
  descripcion: string
  pedido: IPedido
  numero: string
  codigo: string
  evidencias: string
  estado: EstadoReclamo
  usuario: IUsuario
  createdAt?: Date;
  updatedAt?: Date;
}

type EstadoReclamo =
  | 'PENDIENTE'
  | 'ATENCION'
  | 'ATENDIDO'
  | 'CANCELADO'