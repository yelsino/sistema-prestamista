import { IRespuesta } from "types-prestamista";

export class Respuesta<T> implements IRespuesta<T> {
  mensaje: string = "";
  ok: boolean = false;
  code: number = 404;
  data?:T | null = null;

  constructor() {
    this.mensaje = "";
    this.ok = false;
    this.code = 404;
    this.data = null;
  }
}