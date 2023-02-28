
import { Schema,  model } from "mongoose";

export interface IDepartamento {
    nombre: string;
}

const DepartamentoSchema = new Schema<IDepartamento>(
  {
   nombre: String,
  }
);


const Departamento = model("departamentos", DepartamentoSchema);
export default Departamento;
