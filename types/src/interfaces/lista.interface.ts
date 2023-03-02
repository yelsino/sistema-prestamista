import { IProducto } from "./producto.interface";
import { IUsuario } from "./usuario.interface";

export interface ILista {
  _id?: string
  nombre: string
  usuario: IUsuario
  itemsLista: Array<ItemLista>
  createdAt?: Date
  updatedAt?: Date
}

export interface ItemLista {
  _id?: string
  cantidades: Array<Cantidad>
  producto: IProducto
  montoTotal: number
  cantidadTotal: number
  unidadMedida: string
}

export interface Cantidad {
    _id?: string
    peso: number
    precio: number
    textoPesoA: string
    textoPesoB: string
    montoCantidad: number
    cantidad: number
}
