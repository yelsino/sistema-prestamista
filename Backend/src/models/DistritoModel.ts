
import { Schema,  model } from "mongoose";
import { IProvincia } from "./ProvinciaModel";

interface IDistrito {
    nombre: string;
    provincia: IProvincia;
}

const DistritoSchema = new Schema<IDistrito>(
  {
   nombre: String,
   provincia: {type: Schema.Types.ObjectId, ref: "provincias"}
  }
);


const Distrito = model("distritos", DistritoSchema);
export default Distrito;
