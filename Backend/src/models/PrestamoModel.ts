
import { Schema,  model } from "mongoose";
import { IMoneda, IPrestamo } from "types-prestamista";

const PrestamoSchema = new Schema<IPrestamo>(
  {
    numero: Number,
    cliente: { type: Schema.Types.ObjectId, ref: "clientes" },
    monto: Number,
    interes: Number,
    montoTotal: Number,
    moneda: { type: Schema.Types.ObjectId, ref: "monedas" },
    estado: String,
    agente: { type: Schema.Types.ObjectId, ref: "usuarios" },
    numeroCuotas: Number,
    formaPago: String,
  }
);

const Prestamo = model("prestamos", PrestamoSchema);
export default Prestamo;
