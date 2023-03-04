// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'

const Monedas = () => {
  interface DataType {
    id: string;
    nombre: string
    abreviatura: string
    simbolo: string
    estado: string
    descripcion: string
    acciones: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      align: 'left',
      render: (text) => <a >{text}</a>
    },
    {
      title: 'Abreviatura',
      dataIndex: 'abreviatura',
      key: 'abreviatura',
      align: 'center'
    },
    {
      title: 'Simbolo',
      dataIndex: 'simbolo',
      key: 'simbolo',
      align: 'center'
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      align: 'left'
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      align: 'center'
    }
  ]

  const data: DataType[] = [
    {
      id: '1',
      nombre: 'Dólar estadounidense',
      abreviatura: 'USD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de los Estados Unidos de América',
      acciones: 'Boton Editar'
    },
    {
      id: '2',
      nombre: 'Euro',
      abreviatura: 'EUR',
      simbolo: '€',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de la Unión Europea',
      acciones: 'Boton Editar'
    },
    {
      id: '3',
      nombre: 'Libra esterlina',
      abreviatura: 'GBP',
      simbolo: '£',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial del Reino Unido',
      acciones: 'Boton Editar'
    },
    {
      id: '4',
      nombre: 'Yen japonés',
      abreviatura: 'JPY',
      simbolo: '¥',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Japón',
      acciones: 'Boton Editar'
    },
    {
      id: '5',
      nombre: 'Dólar canadiense',
      abreviatura: 'CAD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Canadá',
      acciones: 'Boton Editar'
    },
    {
      id: '6',
      nombre: 'Franco suizo',
      abreviatura: 'CHF',
      simbolo: 'CHF',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Suiza',
      acciones: 'Boton Editar'
    },
    {
      id: '7',
      nombre: 'Dólar australiano',
      abreviatura: 'AUD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Australia',
      acciones: 'Boton Editar'
    },
    {
      id: '8',
      nombre: 'Peso mexicano',
      abreviatura: 'MXN',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de México',
      acciones: 'Boton Editar'
    },
    {
      id: '9',
      nombre: 'Yuan chino',
      abreviatura: 'CNY',
      simbolo: '¥',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de China',
      acciones: 'Boton Editar'
    }

  ]

  return (
      <div>
          <TablaAntidesing
            data={data}
            columns={columns}
            config={{
              title: 'Monedas',
              link: '/monedas/nuevo'
            }}
          />
      </div>
  )
}

export default Monedas
