
import { Schema,  model } from "mongoose";
import { IProvincia } from "types-prestamista";


const ProvinciaSchema = new Schema<IProvincia>(
  {
   nombre: String,
   departamento: {type: Schema.Types.ObjectId, ref: "departamentos"},
   codigo: Number,
  }
);


const Provincia = model("provincias", ProvinciaSchema);
export default Provincia;
