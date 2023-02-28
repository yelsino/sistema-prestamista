
import { Schema,  model } from "mongoose";
import { IDepartamento } from "./DepartamentoModel";

export interface IProvincia {
    nombre: string;
    departamento: IDepartamento;
}

const ProvinciaSchema = new Schema<IProvincia>(
  {
   nombre: String,
   departamento: {type: Schema.Types.ObjectId, ref: "departamentos"}
  }
);


const Provincia = model("provincias", ProvinciaSchema);
export default Provincia;
