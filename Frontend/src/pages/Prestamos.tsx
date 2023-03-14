// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'

import { Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { PrestamoContext } from '../Context/prestamo/PrestamoContext'
import { IPrestamo } from 'types-prestamista'
import { Link } from 'react-router-dom'

const Prestamos = () => {
  const { obtenerPrestamos, prestamos } = useContext(PrestamoContext)

  const columns: ColumnsType<IPrestamo[]> = [
    {
      title: 'N° Prestamo',
      dataIndex: 'numero',
      key: 'numero',
      align: 'center',
      render: (text) => <span >{text}</span>
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
    },
    {
      title: 'Accion',
      key: 'accion',
      dataIndex: '_id',
      fixed: 'right',
      align: 'center',
      className: 'bg-blue-500',
      width: 100,
      render: (id) => <Link to={`/prestamos/${id}`} className='block w-full py-5 '>
        ver
      </Link>
    }
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
