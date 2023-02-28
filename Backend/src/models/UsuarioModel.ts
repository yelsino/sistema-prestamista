import { Schema,  model } from "mongoose";
import { IUsuario } from "types-yola";

const UserSchema = new Schema<IUsuario>(
  {
    nombres: String,
    apellidos: String,
    sobreNombre: String,
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