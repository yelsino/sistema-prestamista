import { Schema,  model } from "mongoose";
import { ICredito } from "types-yola";


const CreditoSchema = new Schema<ICredito>(
  {
    monto: {type: Number, required: true},
    cliente: {type: Schema.Types.ObjectId, ref: 'clientes'},
    codigo: String,
    tipoPago: String,
    evidencias: [String]
  },
  {
    timestamps: true
  }
);

CreditoSchema.method('toJSON', function name() {
  const {__v, createdAt, updatedAt,  ...object } = this.toObject();
  object.creacion = createdAt
  object.modificacion = updatedAt
  return object;
});

const Credito = model("creditos", CreditoSchema);
export default Credito;
