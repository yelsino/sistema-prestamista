import { IUsuario } from "./usuario.interface";

export interface IAuth {
  correo: string;
  password: string;
  codigo?: string;
  tipo?: TipoAuth;
}

type PartialIAuth = Partial<IAuth>;

export interface IAuthOperario extends PartialIAuth {
  documento: string;
}

export type TipoAuth = 'CORREO' | 'GOOGLE' | 'FACEBOOK' | 'MOVIL'

export interface IAuthRest {
  token: string;
  usuario: IUsuario;
}

export interface IAuthGoogle {
  googleId: string
  profileObj: ProfileObj
}

interface ProfileObj {
  imageUrl: string
  email: string
  name: string
  givenName: string
  familyName: string
}


export interface IAuthFacebook {
  name: string,
  email: string,
  picture:{data:PictureFacebook},
  _id?: string,
  accessToken: string,
  userID: string,
  expiresIn: number,
}
interface PictureFacebook {
  height: number,
  is_silhouette: boolean,
  url: string,
  width: number
}

export interface IMobile {
  celular: string,
  password: string
  codigo?: string
}