// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'

import { Tag } from 'antd'

const Prestamos = () => {
  interface DataType {
    id: string;
    cliente: string
    monto: string
    interes: string
    total: string
    tipoMoneda: string
    estado: string
    acciones: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'N° Prestamo',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text) => <a >{text}</a>
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      align: 'left'
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
      dataIndex: 'total',
      key: 'total',
      align: 'center'
    },
    {
      title: 'T. Moneda',
      dataIndex: 'tipoMoneda',
      key: 'tipoMoneda',
      align: 'center'
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
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      align: 'right'
    }
  ]

  const data: DataType[] = [
    {
      id: '9',
      cliente: 'Elena García Gonzáles',
      monto: '1000',
      interes: '100',
      total: '1100',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_ACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '8',
      cliente: 'Jose Martinez Perez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_INACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '7',
      cliente: 'Maria Hernandez Lopez',
      monto: '1500',
      interes: '150',
      total: '1650',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_ACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '6',
      cliente: 'Juan Gonzales Sanchez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_ACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '5',
      cliente: 'Sofia Perez Martinez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_INACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '4',
      cliente: 'Carlos Lopez Hernandez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_INACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '3',
      cliente: 'Pedro Martinez Hernandez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_ACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '2',
      cliente: 'Marta Gonzales Perez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_INACTIVO',
      acciones: 'Boton editar'
    },
    {
      id: '1',
      cliente: 'Davis Lopez Sanchez',
      monto: '500',
      interes: '50',
      total: '550',
      tipoMoneda: 'PEN',
      estado: 'CREDITO_ACTIVO',
      acciones: 'Boton editar'
    }
  ]

  return (
      <div>
          <TablaAntidesing
            data={data}
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
