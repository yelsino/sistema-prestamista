// import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TablaAntidesing } from '../partials/dashboard/TableAntidesing'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { ClienteContext } from '../Context/Cliente/ClienteContext'

const Clientes = () => {
  interface DataType {
    id: string;
    dni: string;
    nombres: string;
    apellidos: string;
    genero: string;
    celular: string;
    empresa: string;
    estado: string;
    acciones: string;
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
            {genero === 'F' ? <TbGenderFemale className='text-pink-500' /> : <TbGenderMale className='text-blue-400' />}
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
    },
    {
      title: 'Acciones',
      key: 'acciones',
      dataIndex: 'acciones',
      align: 'right'
    }
  ]

  // const data: DataType[] = [
  //   {
  //     id: '1',
  //     dni: '123456789',
  //     nombres: 'Elena',
  //     apellidos: 'García González',
  //     genero: 'F',
  //     celular: '987654321',
  //     empresa: 'Empresa 1',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '2',
  //     dni: '234567890',
  //     nombres: 'José',
  //     apellidos: 'Martínez Pérez',
  //     genero: 'M',
  //     celular: '987654322',
  //     empresa: 'Empresa 2',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '3',
  //     dni: '345678901',
  //     nombres: 'María',
  //     apellidos: 'Hernández López',
  //     genero: 'F',
  //     celular: '987654323',
  //     empresa: 'Empresa 3',
  //     estado: 'CREDITO_INACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '4',
  //     dni: '456789012',
  //     nombres: 'Juan',
  //     apellidos: 'González Sánchez',
  //     genero: 'M',
  //     celular: '987654324',
  //     empresa: 'Empresa 4',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '5',
  //     dni: '567890123',
  //     nombres: 'Sofía',
  //     apellidos: 'Pérez Martínez',
  //     genero: 'F',
  //     celular: '987654325',
  //     empresa: 'Empresa 5',
  //     estado: 'CREDITO_INACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '6',
  //     dni: '678901234',
  //     nombres: 'Carlos',
  //     apellidos: 'López Hernández',
  //     genero: 'M',
  //     celular: '987654326',
  //     empresa: 'Empresa 6',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '7',
  //     dni: '789012345',
  //     nombres: 'Laura',
  //     apellidos: 'Sánchez González',
  //     genero: 'F',
  //     celular: '987654327',
  //     empresa: 'Empresa 7',
  //     estado: 'CREDITO_INACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '8',
  //     dni: '890123456',
  //     nombres: 'Pedro',
  //     apellidos: 'Martínez Hernández',
  //     genero: 'M',
  //     celular: '987654328',
  //     empresa: 'Empresa 8',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '9',
  //     dni: '901234567',
  //     nombres: 'Marta',
  //     apellidos: 'González Pérez',
  //     genero: 'F',
  //     celular: '987654329',
  //     empresa: 'Empresa 9',
  //     estado: 'CREDITO_INACTIVO',
  //     acciones: 'Editar'
  //   },
  //   {
  //     id: '10',
  //     dni: '012345678',
  //     nombres: 'David',
  //     apellidos: 'López Sánchez',
  //     genero: 'M',
  //     celular: '987654330',
  //     empresa: 'Empresa 10',
  //     estado: 'CREDITO_ACTIVO',
  //     acciones: 'Editar'
  //   }
  // ]

  const { obtenerClientes, clientes } = useContext(ClienteContext)

  console.log(obtenerClientes)

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
