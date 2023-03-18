import { IDireccion } from "./direccion.interface";
import { IPrestamo } from "./prestamo.interface";
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
    estado: EstadoCliente;
    agente: IUsuario;
    direccion: IDireccion;
  }

  export interface IClienteDetalle extends Partial<ICliente> {
    prestamos: Partial<IPrestamo[]>,
  }

  type EstadoCliente = 'CON_PRESTAMO' | 'SIN_PRESTAMO'

  export interface RegistroCliente extends Partial<ICliente>, Partial<IDireccion> {
    nombreDireccion: string,
  }