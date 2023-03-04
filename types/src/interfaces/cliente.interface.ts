import { IUsuario } from "./usuario.interface";

export interface ICliente {
    _id?: string;
    nombres: string;
    apellidos: string;
    documento: string;
    genero: string;
    celular: string;
    telefono: string;
    correo: string;
    empresa: string;
    ruc: string;
    razonSocial: string;
    estado: string;
    agente: IUsuario
  }