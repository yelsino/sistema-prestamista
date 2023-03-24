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
import PrintFicha from '../partials/clientes/PrintFicha'
import { IconDownload, IconMoney, IconoClienteOut } from '../Components/iconos'

const Clientes = () => {
  const { clientes, obtenerClientes } = useContext(ClienteContext)
  const { generarContrato } = useContext(PrestamoContext)

  useEffect(() => {
    obtenerClientes()
  }, [])
  return (
        <div>
            <button onClick={() => generarContrato()}>BTN GENERAR CONTRATO </button>
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
    title: 'Acción',
    key: 'accion',
    dataIndex: '_id',
    fixed: 'right',
    align: 'center',
    className: 'bg-blue-500',
    width: 100,
    render: (id) => (
            <Dropdown
                overlayStyle={{
                  width: 170,
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

const itemsAction = (cliente: string): MenuProps['items'] => {
  return [
    {
      key: '1',
      label: (
                <Link
                    className="flex gap-x-3"
                    to={`/clientes/${cliente}`}
                    state={{ cliente }}
                >
                    <IconoClienteOut estilo="w-5 h-5 text-purple-500" />
                    ver cliente
                </Link>
      )
    },
    {
      key: '2',
      label: (
                <Link
                    className="flex gap-x-3"
                    to="/prestamos/nuevo"
                    state={{ cliente }}
                >
                    <IconMoney estilo="w-5 h-5 text-purple-500" />
                    prestar dinero
                </Link>
      )
    },
    {
      key: '3',
      label: (
                <PrintFicha cliente={cliente}>
                    <div className="flex gap-x-3 ">
                        <IconDownload estilo="w-5 h-5 text-purple-500" />
                        ficha cliente
                    </div>
                </PrintFicha>
      )
    }
  ]
}
