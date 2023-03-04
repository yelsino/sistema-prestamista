import { Schema,  model } from "mongoose";
import { IUsuario } from "types-prestamista";

const UserSchema = new Schema<IUsuario>(
  {
    nombres: String,
    apellidos: String,
    celular: String,
    online: Boolean,
    roles: [{ type: Schema.Types.ObjectId, ref: "roles" }],
    foto: String,
    documento: String,
    correo: String,
    estado: Boolean,
    nombreUsuario: String,
    password: String,
    codigo: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Usuario = model("usuarios", UserSchema);
export default Usuario;