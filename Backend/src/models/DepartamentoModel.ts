
import { Schema,  model } from "mongoose";

export interface IDepartamento {
    nombre: string;
    codigo: number;
}

const DepartamentoSchema = new Schema<IDepartamento>(
  {
   nombre: String,
   codigo: Number,
  }
);


const Departamento = model("departamentos", DepartamentoSchema);
export default Departamento;
