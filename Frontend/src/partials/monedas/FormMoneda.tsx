import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'

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
                  NUEVA MONEDA
              </h2>
                  {/* <Switch
                      checkedChildren="CON EMPRESA"
                      unCheckedChildren="SIN EMPRESA"
                      className="bg-gray-400 text-gray-800"
                      onChange={() => setEmpresa(!empresaState)}
                  /> */}
          </header>
          <Form
              form={form}
              name="horizontal_login"
              layout="vertical"
              className=""
              initialValues={{
                nombreMoneda: '',
                abreviatura: '',
                simbolo: '',
                descripcion: ''

              }}
              onFinish={(values) => console.log(values)}
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item
                      name="nombreMoneda"
                      label="Nombre moneda"
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
                      name="abreviatura"
                      label="Abreviatura"
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
                      name="simbolo"
                      label="Simbolo"
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
                      label="Descripción"
                      name="descripcion"
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
