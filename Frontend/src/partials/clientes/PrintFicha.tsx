import React, { useContext, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
// import { IconPrintSolid } from '../../Components/iconos'
import { FichaCliente } from './FichaCliente'

interface Props {
    cliente: string;
    children: React.ReactNode;
}
const PrintFicha = ({ cliente, children }: Props) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const { obtenerDetalleCliente, clienteDetalle } =
        useContext(ClienteContext)

  useEffect(() => {
    if (cliente) {
      obtenerDetalleCliente(cliente)
    }
  }, [])

  return (
        <>
            <div onClick={handlePrint}>{children}</div>
            <div style={{ display: 'none' }}>
                <FichaCliente ref={componentRef} cliente={clienteDetalle} />
            </div>
        </>
  )
}

export default PrintFicha
