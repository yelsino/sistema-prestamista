
import { Schema,  model } from "mongoose";
import { IDepartamento } from "types-prestamista";

const DepartamentoSchema = new Schema<IDepartamento>(
  {
   nombre: String,
   codigo: Number,
  }
);


const Departamento = model("departamentos", DepartamentoSchema);
export default Departamento;
