import { ICredito } from "./credito.interface";

export interface IAbonoCredito {
 _id?: string,
 monto: number
 evidencias: Array<string>
 credito: ICredito
}
