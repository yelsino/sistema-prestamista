// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { ClienteContext } from '../Context/cliente/ClienteContext'
import { ICliente } from 'types-prestamista'
import { Link } from 'react-router-dom'

const Clientes = () => {
  const { clientes, obtenerClientes } = useContext(ClienteContext)

  useEffect(() => {
    obtenerClientes()
  }, [])
  return (
      <div>
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
    render: (text) => <a >{text}</a>
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
        <div key={genero} className='text-2xl'>
          {genero === 'Femenino' ? <TbGenderFemale className='text-pink-500' /> : <TbGenderMale className='text-blue-400' />}
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
    render: (id) => <Link
      to={{ pathname: '/prestamos/nuevo' }}
      state={{ cliente: id }}
      className='block w-full py-5 '>
      prestar
    </Link>
  }
]
