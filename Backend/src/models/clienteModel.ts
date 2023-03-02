import { Schema,  model } from "mongoose";
import { IUsuario } from "types-yola";

export interface ICliente {
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
  estado: string;
}


const UserSchema = new Schema<ICliente>(
  {
    nombres: String,
    apellidos: String,
    correo: {type: String, required: true},
    celular: String,
    password: {type: String, required: true},
    online: Boolean,
    roles: [{type: Schema.Types.ObjectId, ref: 'roles'}],
    foto: String,
    documento: String,
    idExterno: {type: String, default: null}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Usuario = model("usuarios", UserSchema);
export default Usuario;