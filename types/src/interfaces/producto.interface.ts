import { ICategoria } from "./categoria.interface";

export interface IProducto {
  _id?: string
  nombre: string
  imagen: string
  descripcion: string
  marca: string
  tipoVenta: TipoVenta;
  precioCompra: number
  precioVenta: number
  unidades: number
  sobrante: number
  cantidadPorUnidad: number
  envoltorio: Envoltorio
  estados: EstadosProducto
  visibilidad: Boolean
  alertaCantidad: number
  categoria: ICategoria
  tags: Array<string>
  precios: Array<Precio>
  precioUnidad: number
  createdAt?: Date
  updatedAt?: Date
}

export type TipoVenta = 
| 'FRACCIONES' 
| 'KILOGRAMOS' 
| 'UNIDADES' 
| 'LITROS'

export enum EnumTipoVenta {
  FRACCIONES = 'FRACCIONES',
  KILOGRAMOS = 'KILOGRAMOS',
  UNIDADES = 'UNIDADES',
  LITROS = 'LITROS'
}


export type Envoltorio = 
 | 'COSTALES'
 | 'BOLSAS'
 | 'CAJAS'

 export type EstadosProducto =
  | 'CON_STOCK'
  | 'SIN_STOCK'
  | 'POR_AGOTAR'

  export interface Precio {
    _id?: string
    peso: number
    precio: number
    cantidad?: number
    textoPesoA?: string
    textoPesoB?: string
  }