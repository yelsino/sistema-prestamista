import { Schema,  model } from "mongoose";
import { IDistrito, IFormasPago } from "types-prestamista";



const FormaPagoSchemna = new Schema<IFormasPago>(
  {
   nombre: String,
   dias: Number,
  }
);


const FormaPago = model("formaspago", FormaPagoSchemna);
export default FormaPago;
