import { IUsuario } from "./usuario.interface"

export interface IDireccion {
 _id?: string
 nombre: string
 referencia: string
 usuario: IUsuario
}
