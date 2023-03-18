// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tag, Dropdown, Space } from 'antd'
import { useContext, useEffect } from 'react'
import { ClienteContext } from '../Context/cliente/ClienteContext'
import { ICliente } from 'types-prestamista'
// import { Link } from 'react-router-dom'
import { PrestamoContext } from '../Context/prestamo/PrestamoContext'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const Clientes = () => {
  const { clientes, obtenerClientes } = useContext(ClienteContext)
  const { generarContrato } = useContext(PrestamoContext)

  useEffect(() => {
    obtenerClientes()
  }, [])
  return (
      <div>
          <a
            onClick={() => generarContrato()}
          >BTN GENERAR CONTRATO </a>
          <TablaAntidesing
            data={clientes}
            columns={columns}
            config={{
              title: 'Clientes',
              link: '/clientes/nuevo'
            }}
          />
      </div>
  )
}

export default Clientes

const columns: ColumnsType<ICliente> = [
  {
    title: 'DNI',
    dataIndex: 'documento',
    key: 'documento',
    align: 'left',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    align: 'left'
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    align: 'left'
  },
  {
    title: 'Genero',
    key: 'genero',
    dataIndex: 'genero',
    align: 'left',
    render: (genero) => {
      return (
                <div key={genero} className="text-2xl">
                    {genero === 'Femenino'
                      ? (
                        <TbGenderFemale className="text-pink-500" />
                        )
                      : (
                        <TbGenderMale className="text-blue-400" />
                        )}
                </div>
      )
    }
  },
  {
    title: 'Celular',
    key: 'celular',
    dataIndex: 'celular',
    align: 'center'
  },
  {
    title: 'Empresa',
    key: 'empresa',
    dataIndex: 'empresa',
    align: 'center'
  },
  {
    title: 'Estado',
    key: 'estado',
    dataIndex: 'estado',
    align: 'center',
    render: (estado) => {
      return (
                <div key={estado} className="text-2xl">
                    {estado === 'CON_PRESTAMO'
                      ? (
                        <Tag color="green">con crédito</Tag>
                        )
                      : (
                        <Tag color="red">sin credito</Tag>
                        )}
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
    render: (id) => (
            <Dropdown
                overlayStyle={{
                  width: 150,
                  top: 40,
                  left: -50,
                  margin: '0 10 0 0'
                }}
                menu={{ items: itemsAction(id) }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Acciones
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
    )
  }
]

const itemsAction = (cliente: string):MenuProps['items'] => {
  return [
    {
      key: '1',
      label: (
              <Link to={`/clientes/${cliente}`} state={{ cliente }}>
                  ver cliente
              </Link>
      )

    },
    {
      key: '2',
      label: <Link to='/prestamos/nuevo' state={{ cliente }}>prestar</Link>
    },
    {
      key: '3',
      label: <Link to="/prestamos/nuevo">ficha cliente</Link>
    }
  ]
}
