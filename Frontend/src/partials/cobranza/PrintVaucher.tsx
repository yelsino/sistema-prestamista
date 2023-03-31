import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ICuota, IPrestamo } from 'types-prestamista'
import { useVaucher } from '../../Hooks/useVaucher'
import { formatToMoney2 } from '../../utils/formats'
import { dateToEspanish } from '../../utils/Utils'

interface Props {
    prestamo?: IPrestamo;
    cuotasAPagar?: ICuota[];
    cuotas?: ICuota[];
    children?: React.ReactNode;
}

const PrintVaucher = ({ prestamo, cuotasAPagar, cuotas, children }: Props) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
        <>
            <div onClick={handlePrint}>{children}</div>
            <div style={{ display: 'none' }}>
                <VaucherPrint
                    ref={componentRef}
                    cuotas={cuotas}
                    cuotasAPagar={cuotasAPagar}
                    prestamo={prestamo}
                />
            </div>
        </>
  )
}

export default PrintVaucher

class VaucherPrint extends React.PureComponent<Props> {
  render () {
    const { prestamo, cuotasAPagar, cuotas } = this.props
    const { cliente, agente } = prestamo
    const { cuotasFaltantes, montoAPagar, saldoPendiente } = useVaucher({
      cuotasAPagar,
      cuotas
    })
    return (
            <div className=" pb-5">
                <div className="   text-xs mx-4 sm:mx-0 bg-white">
                    <div>
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-gray-600 text-xs">
                                    Fecha de prestamo:{' '}
                                    {dateToEspanish(prestamo.fechaEmision)}
                                </p>
                                <p className="text-gray-600 text-xs">
                                    Codigo prestamo: {prestamo.codigo}
                                </p>
                                <p className="text-gray-600 text-xs">
                                    Monto prestado:{' '}
                                    {formatToMoney2(prestamo.monto)}
                                </p>
                                <p className="text-gray-600 text-xs capitalize">
                                    Prestatario: {cliente.nombres}{' '}
                                    {cliente.apellidos}
                                </p>
                                <p className="text-gray-600 text-xs capitalize">
                                    Prestamista:{' '}
                                    {`${agente.nombres} ${agente.apellidos}`}
                                </p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div>
                            <div>
                                {cuotasAPagar.map((cuota) => (
                                    <div key={cuota._id}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-base">
                                                Cuota #{cuota.numeroCuota}
                                            </span>
                                            <span className="text-base font-medium">
                                                {formatToMoney2(cuota.monto)}
                                            </span>
                                        </div>
                                        <div className="mb-4 flex justify-between items-center">
                                            <span>*Interés de cuota:</span>
                                            <span className="">S/. 0.00</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />
                            <div className="flex justify-between items-center">
                                <span>Cuotas a pagar:</span>
                                <span className="">{cuotasAPagar.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Cuotas faltantes</span>
                                <span className="">{cuotasFaltantes}</span>
                            </div>
                            <div className="mb-2 flex justify-between items-center">
                                <span>Saldo pendiente</span>
                                <span className="">{saldoPendiente}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium">
                                    Monto a Pagar
                                </span>
                                <span className="text-lg font-medium">
                                    {montoAPagar}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}
