import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import Search from 'antd/es/input/Search'
import { IconoClienteOut } from '../../Components/iconos'
import { TablaAntidesing } from '../dashboard/TableAntidesing'
import { ColumnsType } from 'antd/es/table'

const FormCobranza: React.FC = () => {
//   const [empresaState, setEmpresa] = useState(false)

  const [form] = Form.useForm()

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  }

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  REALIZAR COBRANZA
              </h2>

              <Space>
                  <Search
                      placeholder="Buscar cliente"
                      allowClear
                      enterButton={
                          <div className="flex gap-x-2 items-center">
                              <IconoClienteOut estilo="h-5 w-5" /> Buscar
                          </div>
                      }
                      size="large"
                      //   onSearch={onSearch}
                  />
              </Space>
          </header>
          <Form
              form={form}
              name="horizontal_login"
              layout="vertical"
              className=""
              initialValues={{
                documento: '',
                nombreCompleto: '',
                montoPrestado: '',
                formaPago: '',
                moneda: ''
              }}
              onFinish={(values) => console.log(values)}
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item name="documento" label="N° Documento">
                      <Input
                          disabled
                          prefix={
                              <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="ej: Dolar"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item name="nombreCompleto" label="Nombre Completo">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Juan Gabriel"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item name="montoPrestado" label="Monto Prestado">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item name="formaPago" label="Forma de Pago">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item name="tipoMoneda" label="Tipo Moneda">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>
              </div>

              <div className='pt-5  gap-y-5  flex flex-col '>
                  <TablaAntidesing
                      columns={columns}
                      data={data}
                      seleccion={rowSelection}
                      config={{
                        title: 'Cuotas de prestamo',
                        link: ''
                      }}
                  />
                  <Form.Item name="montoTotal" label="Monto Total">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>
              </div>

              <Form.Item shouldUpdate>
                  {() => (
                      <Button
                          type="primary"
                          htmlType="submit"
                          className="bg-blue-500 text-white"
                          // disabled={
                          //     !form.isFieldsTouched(true) ||
                          //     !!form
                          //       .getFieldsError()
                          //       .filter(({ errors }) => errors.length).length
                          // }
                      >
                          Registrar
                      </Button>
                  )}
              </Form.Item>
          </Form>
      </div>
  )
}

export default FormCobranza

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'left',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    align: 'left',
    sorter: {
      compare: (a, b) => a.age - b.age
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: 'left'
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park'
  }
]
