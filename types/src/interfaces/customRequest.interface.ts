import { IUsuario } from "./usuario.interface";

export interface ICustomRequest extends Request {
  user: IUsuario;
}