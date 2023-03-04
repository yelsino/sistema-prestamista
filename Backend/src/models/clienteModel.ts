import { Schema,  model } from "mongoose";
import { ICliente } from "types-prestamista";

const UserSchema = new Schema<ICliente>(
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

const Usuario = model("usuarios", UserSchema);
export default Usuario;