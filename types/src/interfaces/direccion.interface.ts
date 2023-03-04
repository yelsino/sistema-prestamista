import { ICliente } from "./cliente.interface";

export interface IDepartamento {
    _id?: string;
    nombre: string;
    codigo: number;
}

export interface IProvincia {
    _id?: string;
    nombre: string;
    departamento: IDepartamento;
    codigo: number;
    uuid: number;
}

export interface IDistrito {
    _id?: string;
    nombre: string;
    provincia: IProvincia;
    codigo: number;
    uuid: number;
}

export interface IDireccion {
    _id?: string;
    nombre: string;
    referencia: string;
    departamento: IDepartamento;
    provincia: IProvincia;
    distrito: IDistrito;
    cliente: ICliente;
}