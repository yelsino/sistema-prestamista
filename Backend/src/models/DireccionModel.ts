import { Schema,  model } from "mongoose";
import { IDireccion } from "types-yola";


const DireccionSchema = new Schema<IDireccion>(
  {
   nombre: String,
   referencia: String,
   usuario: {type: Schema.Types.ObjectId}
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
