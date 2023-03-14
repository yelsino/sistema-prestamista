
import { Schema,  model } from "mongoose";
import { ICuota } from "types-prestamista";


const CuotaSchema = new Schema<ICuota>(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "clientes" },
    agente: { type: Schema.Types.ObjectId, ref: "usuarios" },
    fechaPago: Date,
    fechaLimite: Date,
    prestamo: { type: Schema.Types.ObjectId, ref: "prestamos" },
    monto: Number,
    estado: { type: String, enum: ['PENDIENTE', 'PAGADO'], default: 'PENDIENTE'},
    numeroCuota: Number,
  }
);
  

const Cuota = model("cuotas", CuotaSchema);
export default Cuota;
