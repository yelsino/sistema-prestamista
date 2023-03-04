import { Schema,  model } from "mongoose";
import { ICodigoTemporal } from "types-prestamista";


const CodigoTemporalSchema = new Schema<ICodigoTemporal>(
  {
    codigo: {type:String},
    usuario: {type:Schema.Types.ObjectId, ref: 'usuarios'},
    tipo: String,
    estado: {type: Boolean, default:false}
  },
  {
    timestamps: true
  }
);

CodigoTemporalSchema.method('toJSON', function name() {
  const {__v, createdAt, updatedAt,  ...object } = this.toObject();
  object.creacion = createdAt
  object.modificacion = updatedAt
  return object;
})

const CodigoTemporal = model("codigoTemporal", CodigoTemporalSchema);
export default CodigoTemporal;
