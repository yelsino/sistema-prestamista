import { IAuth } from "./auth.interface";

export interface IUsuario extends IAuth {
    _id?: string;
    nombres: string;
    apellidos: string;
    sobreNombre: string;
    celular: string;
    online: Boolean;
    roles: Array<IRol>;
    foto: string;
    documento: string;
    idExterno?: string;
    estado?: Boolean;
}

type PartialIUsuario = Partial<IUsuario>;
export interface Operario extends PartialIUsuario {
  direccion: string;
}

export interface IRol {
    _id?: string;
    nombre: Roles;
  }
  
  type Roles = 
    | 'USUARIO'
    | 'CASERO'
    | 'TRABAJADOR'
    | 'ADMIN'
  