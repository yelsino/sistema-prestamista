// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'

import { Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { PrestamoContext } from '../Context/prestamo/PrestamoContext'
import { IPrestamo } from 'types-prestamista'

const Prestamos = () => {
  const { obtenerPrestamos, prestamos } = useContext(PrestamoContext)

  // numero: number;
  // cliente: ICliente;
  // monto: number;
  // interes: number;
  // montoTotal: number;
  // moneda: IMoneda;
  // estado: string;
  // agente: IUsuario;
  // numeroCuotas: number;
  // formaPago: FormaPago;

  const columns: ColumnsType<IPrestamo[]> = [
    {
      title: 'N° Prestamo',
      dataIndex: 'numero',
      key: 'numero',
      align: 'center',
      render: (text) => <a >{text}</a>
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      align: 'left',
      render: (cliente) => <p>{`${cliente.nombres}  ${cliente.apellidos}`}</p>
    },
    {
      title: 'Monto Credito',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center'
    },
    {
      title: 'Monto Interes',
      dataIndex: 'interes',
      key: 'interes',
      align: 'center'
    },
    {
      title: 'Monto Total',
      dataIndex: 'montoTotal',
      key: 'montoTotal',
      align: 'center'
    },
    {
      title: 'T. Moneda',
      dataIndex: 'tipoMoneda',
      key: 'tipoMoneda',
      align: 'center',
      render: () => <p>Soles</p>
    },
    {
      title: 'Estado',
      key: 'estado',
      dataIndex: 'estado',
      align: 'center',
      render: (estado) => {
        return (
          <div key={estado} className='text-2xl'>
            {estado === 'CREDITO_ACTIVO' ? <Tag color='red'>Pendiente</Tag> : <Tag color='green'>Pagado</Tag>}
          </div>
        )
      }
    }
    // {
    //   title: 'Acciones',
    //   dataIndex: 'acciones',
    //   key: 'acciones',
    //   align: 'right'
    // }
  ]

  useEffect(() => {
    obtenerPrestamos()
  }, [])

  return (
      <div>
          <TablaAntidesing
            data={prestamos}
            columns={columns}
            config={{
              title: 'Prestamos',
              link: '/prestamos/nuevo'
            }}
          />
      </div>
  )
}

export default Prestamos
