
export interface IUsuario extends IAuth {
    _id?: string;
    nombres: string;
    apellidos: string;
    celular: string;
    online: Boolean;
    roles: Array<IRol>;
    foto: string;
    documento: string;
    idExterno?: string;
    estado?: Boolean;
}

export interface IAuth {
  nombreUsuario: string;
  password: string;
  codigo?: string;
}

export interface IAuthRest {
  token: string;
  usuario: IUsuario;
}


export interface IRol {
    _id?: string;
    nombre: Roles;
  }
  
  type Roles = 
    | 'ADMIN'
    | 'AGENTE'
  