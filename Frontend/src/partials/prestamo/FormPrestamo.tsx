import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import Search from 'antd/es/input/Search'
import { IconoClienteOut } from '../../Components/iconos'

const FormMoneda: React.FC = () => {
//   const [empresaState, setEmpresa] = useState(false)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})

  useEffect(() => {
    forceUpdate({})
  }, [])

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  NUEVO PRESTAMO
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
                monto: '',
                formaPago: '',
                interes: '',
                cuotas: 0,
                moneda: '',
                fechaEmision: '',
                volorCuota: '',
                valorInteres: '',
                montoTotal: ''
              }}
              onFinish={(values) => console.log(values)}
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item
                      name="documento"
                      label="N° Documento"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Input
                          prefix={
                              <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="ej: Dolar"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="nombreCompleto"
                      label="Nombre Completo"
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
                          type="text"
                          placeholder="EJ: Perez Perez"
                          size="large"
                      />
                  </Form.Item>

                  <Form.Item
                      name="cuotas"
                      label="N° Coutas"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Select size="large">
                          <Select.Option value="masculino">
                              <div className="flex items-center text-blue-400">
                                  <span>Masculino</span>
                                  <span>
                                      <TbGenderMale />
                                  </span>
                              </div>
                          </Select.Option>
                          <Select.Option value="femenino">
                              <div className="flex items-center text-pink-500">
                                  <span>Femenino</span>
                                  <span>
                                      <TbGenderFemale />
                                  </span>
                              </div>
                          </Select.Option>
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
                          <Select.Option value="masculino">
                              <div className="flex items-center text-blue-400">
                                  <span>Masculino</span>
                                  <span>
                                      <TbGenderMale />
                                  </span>
                              </div>
                          </Select.Option>
                          <Select.Option value="femenino">
                              <div className="flex items-center text-pink-500">
                                  <span>Femenino</span>
                                  <span>
                                      <TbGenderFemale />
                                  </span>
                              </div>
                          </Select.Option>
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
                  <Form.Item
                      name="valorCuota"
                      label="Valor Cuota"
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
                      name="valorInteres"
                      label="Valor Interes"
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
                      name="montoTotal"
                      label="Monto Total"
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

export default FormMoneda
