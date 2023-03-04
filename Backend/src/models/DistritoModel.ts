
import { Schema,  model } from "mongoose";
import { IDistrito } from "types-prestamista";



const DistritoSchema = new Schema<IDistrito>(
  {
   nombre: String,
   provincia: {type: Schema.Types.ObjectId, ref: "provincias"},
   codigo: Number,
  }
);


const Distrito = model("distritos", DistritoSchema);
export default Distrito;
