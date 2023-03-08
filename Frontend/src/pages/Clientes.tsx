// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { ClienteContext } from '../Context/Cliente/ClienteContext'
import { ICliente } from 'types-prestamista'

const Clientes = () => {
  const { obtenerClientes, clientes } = useContext(ClienteContext)

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
        <div key={estado} className='text-2xl'>
          {estado === 'CREDITO_ACTIVO' ? <Tag color='green'>con crédito</Tag> : <Tag color='red'>sin credito</Tag>}
        </div>
      )
    }
  }
  // {
  //   title: 'Accion',
  //   key: 'accion',
  //   dataIndex: 'acciones',
  //   fixed: 'right',
  //   align: 'center',
  //   width: 100,
  //   render: () => <a className='w-full flex justify-center py-1 border'>ver</a>
  // }
]
