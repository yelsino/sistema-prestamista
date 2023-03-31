
import { Schema,  model } from "mongoose";
import { IPrestamo } from "types-prestamista";

const PrestamoSchema = new Schema<IPrestamo>(
  {
    numero: Number,
    cliente: { type: Schema.Types.ObjectId, ref: "clientes" },
    codigo: String,
    monto: Number,
    interes: Number,
    montoTotal: Number,
    moneda: { type: Schema.Types.ObjectId, ref: "monedas" },
    estado: { type: String, enum: ['PENDIENTE', 'PAGADO'], default: 'PENDIENTE'},
    agente: { type: Schema.Types.ObjectId, ref: "usuarios" },
    numeroCuotas: Number,
    formaPago: String,
    fechaEmision: { type: Date },
  },
  {
    timestamps: true
  }
);

const Prestamo = model("prestamos", PrestamoSchema);
export default Prestamo;
