import { ICuota } from "./cuota.interface";

export interface IMora {
    _id?: string;
    cuota: ICuota
    fechaMora: Date;
    monto: number;
}