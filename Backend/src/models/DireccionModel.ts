import { Schema,  model } from "mongoose";
import { IDireccion } from "types-prestamista";


const DireccionSchema = new Schema<IDireccion>(
  {
   nombre: String,
    referencia: String,
    departamento: { type: Schema.Types.ObjectId, ref: "departamentos" },
    provincia: { type: Schema.Types.ObjectId, ref: "provincias" },
    distrito: { type: Schema.Types.ObjectId, ref: "distritos" },
    cliente: { type: Schema.Types.ObjectId, ref: "clientes" },
  },
  {
    timestamps: true
  }
);

DireccionSchema.method('toJSON', function name() {
  const {__v, createdAt, updatedAt,  ...object } = this.toObject();
  object.creacion = createdAt
  object.modificacion = updatedAt
  return object;
});

const Direccion = model("direcciones", DireccionSchema);
export default Direccion;
