import { ICuota } from 'types-prestamista'
import { formatToMoney2 } from '../utils/formats'

interface Props {
    cuotasAPagar?: ICuota[];
    cuotas?: ICuota[];
}

export const useVaucher = ({ cuotasAPagar, cuotas }: Props) => {
  const cuotasPendientes = cuotas.filter(
    (cuota) => cuota.estado === 'PENDIENTE'
  )
  const saldoPendiente =
        cuotasAPagar.reduce((acc, curr) => acc + curr.monto, 0) -
        cuotasPendientes.reduce((acc, curr) => acc + curr.monto, 0)

  const montoAPagar = cuotasAPagar.reduce((acc, curr) => acc + curr.monto, 0)

  return {
    saldoPendiente: formatToMoney2(saldoPendiente),
    cuotasFaltantes: cuotasPendientes.length - cuotasAPagar.length,
    montoAPagar: formatToMoney2(montoAPagar)
  }
}
