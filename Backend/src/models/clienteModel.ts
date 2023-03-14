import { Schema,  model } from "mongoose";
import { ICliente } from "types-prestamista";

const ClienteSchema = new Schema<ICliente>(
  {
    nombres: String,
    apellidos: String,
    documento: String,
    genero: String,
    celular: String,
    telefono: String,
    correo: String,
    empresa: String,
    ruc: String,
    razonSocial: String,
    estado: { type: String,enum: ['SIN_PRESTAMO', 'CON_PRESTAMO'], default: "SIN_PRESTAMO"},
    agente: { type: Schema.Types.ObjectId, ref: "usuarios" },
    direccion: { type: Schema.Types.ObjectId, ref: "direcciones" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Cliente = model("clientes", ClienteSchema);
export default Cliente;