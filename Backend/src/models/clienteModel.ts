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
    estado: String,
    agente: { type: Schema.Types.ObjectId, ref: "usuarios" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Cliente = model("clientes", ClienteSchema);
export default Cliente;