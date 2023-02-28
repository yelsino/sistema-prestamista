// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'

const Cobranzas = () => {
  interface DataType {
    id: string;
    nombre: string
    abreviatura: string
    simbolo: string
    estado: string
    descripcion: string
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
      align: 'left'
    },
    {
      title: 'Simbolo',
      dataIndex: 'simbolo',
      key: 'simbolo',
      align: 'left'
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      align: 'left'
    }
  ]

  const data: DataType[] = [
    {
      id: '1',
      nombre: 'Dólar estadounidense',
      abreviatura: 'USD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de los Estados Unidos de América'
    },
    {
      id: '2',
      nombre: 'Euro',
      abreviatura: 'EUR',
      simbolo: '€',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de la Unión Europea'
    },
    {
      id: '3',
      nombre: 'Libra esterlina',
      abreviatura: 'GBP',
      simbolo: '£',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial del Reino Unido'
    },
    {
      id: '4',
      nombre: 'Yen japonés',
      abreviatura: 'JPY',
      simbolo: '¥',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Japón'
    },
    {
      id: '5',
      nombre: 'Dólar canadiense',
      abreviatura: 'CAD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Canadá'
    },
    {
      id: '6',
      nombre: 'Franco suizo',
      abreviatura: 'CHF',
      simbolo: 'CHF',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Suiza'
    },
    {
      id: '7',
      nombre: 'Dólar australiano',
      abreviatura: 'AUD',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de Australia'
    },
    {
      id: '8',
      nombre: 'Peso mexicano',
      abreviatura: 'MXN',
      simbolo: '$',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de México'
    },
    {
      id: '9',
      nombre: 'Yuan chino',
      abreviatura: 'CNY',
      simbolo: '¥',
      estado: 'ACTIVO',
      descripcion: 'Moneda oficial de China'
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
