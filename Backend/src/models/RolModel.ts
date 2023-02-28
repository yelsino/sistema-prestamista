import { Schema,  model } from "mongoose";
import { IRol } from "types-yola";

export const ROLES = ['USUARIO', 'CASERO', 'TRABAJADOR', 'ADMIN'];

const RolSchema = new Schema<IRol>(
  {
    nombre: String 
  },
);

RolSchema.method('toJSON', function name() {
  const {__v, ...object } = this.toObject();
  return object;
})

const Rol = model("roles", RolSchema);
export default Rol;
