
import { Schema,  model } from "mongoose";
import { IMoneda } from "types-prestamista";

const MonedaSchema = new Schema<IMoneda>(
  {
    nombre: String,
    abreviatura: String,
    simbolo: String,
    descripcion: String,
  }
);

const Moneda = model("monedas", MonedaSchema);
export default Moneda;
