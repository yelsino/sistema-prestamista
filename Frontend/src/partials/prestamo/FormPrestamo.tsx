import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import Search from 'antd/es/input/Search'
import { IconoClienteOut } from '../../Components/iconos'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { PrestamoContext } from '../../Context/prestamo/PrestamoContext'
import { IPrestamo } from 'types-prestamista'
import { MonedaContext } from '../../Context/moneda/MonedaContext'

const FormPrestamos: React.FC = () => {
//   const [empresaState, setEmpresa] = useState(false)

  const { buscarClientes, cliente } = useContext(ClienteContext)
  const { generarPrestamo } = useContext(PrestamoContext)
  const { obtenerMoneda, monedas } = useContext(MonedaContext)
  const [numCuotas, setNumCuotas] = useState(0)
  const [interes, setInteres] = useState(0)
  const [monto, setMonto] = useState(0)
  const [valorCuota, setValorCuota] = useState(0)

  console.log(
    numCuotas,
    setNumCuotas,
    interes,
    setInteres,
    monto,
    setMonto,
    valorCuota,
    setValorCuota

  )

  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})

  const onSearch = async (termino: string) => {
    buscarClientes(termino)
  }

  const onFinish = (values: any) => {
    console.log(values)

    generarPrestamo(values)
  }

  useEffect(() => {
    forceUpdate({})
    obtenerMoneda()
  }, [])

  const handleFormValuesChange = (changedValues, values:any) => {
    if ('monto' in changedValues || 'interes' in changedValues || 'cuotas' in changedValues) {
      const monto:number = values.monto || 0
      const interes:number = values.interes || 0
      const cuotas:number = values.cuotas || 0
      const valorInteres:number = monto * (interes / 100)
      const montoTotal:number = Number(monto) + valorInteres
      const valorCuota:number = montoTotal / cuotas
      form.setFieldsValue({
        montoTotal,
        valorInteres,
        valorCuota
      })
    }
  }

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  GENERAR PRESTAMO
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
                      onSearch={onSearch}
                  />
              </Space>
          </header>

          <Form<IPrestamo>
              form={form}
              name="horizontal_login"
              layout="vertical"
              className=""
              initialValues={{
                documento: cliente?.documento,
                nombreCompleto: cliente?.nombres + ' ' + cliente?.apellidos,
                monto: 0,
                formaPago: '',
                interes: 0,
                cuotas: 0,
                moneda: '',
                fechaEmision: '',
                valorCuota: 0,
                valorInteres: 0,
                montoTotal: 0
              }}
              onFinish={onFinish}
              onValuesChange={handleFormValuesChange}
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item name="documento" label="N° Documento">
                      <Input
                          disabled
                          prefix={
                              <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="ej: 77068132"
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
                  <Form.Item
                      name="monto"
                      label="Monto"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Input
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item
                      name="interes"
                      label="Interes"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Input
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="number"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item
                      name="cuotas"
                      label="Número de Cuotas"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Input
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item
                      name="formaPago"
                      label="Forma de Pago"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Select size="large">
                          {formasPago.map((v) => (
                              <Select.Option key={v.id} value={v.nombre}>
                                  <div className="flex items-center ">
                                      <span>{v.nombre}</span>
                                  </div>
                              </Select.Option>
                          ))}
                      </Select>
                  </Form.Item>

                  <Form.Item
                      name="moneda"
                      label="Moneda"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Select size="large">
                          {monedas.map((moneda) => (
                              <Select.Option key={moneda._id} value={moneda.nombre}>
                                  <div className="flex items-center text-blue-400">
                                      <span>{moneda.nombre}</span>
                                  </div>
                              </Select.Option>
                          ))}
                      </Select>
                  </Form.Item>
                  <Form.Item
                      name="fechaEmision"
                      label="Fecha Emision"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Input
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item name="valorCuota" label="Valor por Cuota">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="number"
                          placeholder="0"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item name="valorInteres" label="Valor Interes">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="number"
                          placeholder="0"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item name="montoTotal" label="Monto Total">
                      <Input
                          disabled
                          prefix={
                              <LockOutlined className="site-form-item-icon" />
                          }
                          type="number"
                          placeholder="0"
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

type TipoFormaPago =
    | 'DIARIO'
    | 'SEMANAL'
    | 'QUINCENAL'
    | 'MENSUAL'
    | 'ANUAL'

interface FormasPago {
    id: number;
    nombre: TipoFormaPago;
}

const formasPago: FormasPago[] = [
  { id: 1, nombre: 'DIARIO' },
  { id: 2, nombre: 'SEMANAL' },
  { id: 3, nombre: 'QUINCENAL' },
  { id: 4, nombre: 'MENSUAL' },
  { id: 5, nombre: 'ANUAL' }
]

export default FormPrestamos
