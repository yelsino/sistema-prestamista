// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'
import './estilosPages.css'

const Cobranzas = () => {
  interface DataType {
    id: string;
    dni: string
    cliente: string
    numeroPrestamo: string
    numeroCuota: string
    montoCancelado: string
    fechaPago: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      align: 'left',
      render: (text) => <a >{text}</a>
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      align: 'left'
    },
    {
      title: 'N° Prestamo',
      dataIndex: 'numeroPrestamo',
      key: 'numeroPrestamo',
      align: 'center'
    },
    {
      title: 'N° Cuota',
      dataIndex: 'numeroCuota',
      key: 'numeroCuota',
      align: 'center'
    },
    {
      title: 'M. Cancelado',
      dataIndex: 'montoCancelado',
      key: 'montoCancelado',
      align: 'center'
    },
    {
      title: 'Fecha Pago',
      dataIndex: 'fechaPago',
      key: 'fechaPago',
      align: 'center'
    },
    {
      title: 'Accion',
      key: 'accion',
      dataIndex: 'acciones',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: () => <a className='w-full flex justify-center py-1 border'>ver</a>
    }
  ]

  const data: DataType[] = [
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    },
    {
      id: '1',
      dni: '77498212',
      cliente: 'Elena García González',
      numeroPrestamo: '9',
      numeroCuota: '2',
      montoCancelado: 's/78.00',
      fechaPago: '10/03/2023'
    }
  ]

  return (
      <div>
          <TablaAntidesing
            data={data}
            columns={columns}
            config={{
              title: 'Cobranza',
              link: '/cobranzas/nuevo'
            }}
          />
      </div>
  )
}

export default Cobranzas
