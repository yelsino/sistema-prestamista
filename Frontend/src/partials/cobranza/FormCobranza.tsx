import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'

const FormCobranza: React.FC = () => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values: any) => {
    console.log('Finish:', values)
  }

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  NUEVA COBRANZA
              </h2>
          </header>
          <Form
              form={form}
              name="horizontal_login"
              layout="vertical"
              onFinish={onFinish}
              className=""
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item
                      name="ducumento"
                      label="Número Documento"
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
                          placeholder="ej: 123456789"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="nombres"
                      label="Nombres"
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
                      name="apellidos"
                      label="Apellidos"
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
                    label="Genero"
                    rules={[
                      {
                        required: true,
                        message: 'Este campo es requerido!'
                      }
                    ]}
                    >
                      <Select size='large'>
                          <Select.Option value="masculino">
                              Masculino
                          </Select.Option>
                          <Select.Option value="femenino">
                              Femenino
                          </Select.Option>
                      </Select>
                  </Form.Item>

                  <Form.Item
                      name="departamento"
                      label="Departamento"
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
                          placeholder="EJ: Junin"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="provincia"
                      label="Provincia"
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
                          placeholder="EJ: Huancayo"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="distrito"
                      label="Distrito"
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
                          placeholder="EJ: Huancayo"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="direccion"
                      label="Dirección"
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
                          placeholder="EJ: Jr Los Alamos 123"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="celular"
                      label="Celular"
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
                          placeholder="EJ: 987654321"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="telefono"
                      label="Telefono"
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
                          placeholder="EJ: 987654321"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="razonSocial"
                      label="Razon Social"
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
                          placeholder="EJ: Los Alamos S.A.C"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="ruc"
                      label="RUC"
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
                          placeholder="EJ: 207415145454"
                          size="large"
                      />
                  </Form.Item>
                  <Form.Item
                      name="empresa"
                      label="Empresa"
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
                          placeholder="EJ: LAS MAVINAS"
                          size="large"
                      />
                  </Form.Item>
              </div>

              <Form.Item shouldUpdate>
                  {() => (
                      <Button
                          type="primary"
                          htmlType="submit"
                          disabled={
                              !form.isFieldsTouched(true) ||
                              !!form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                          }
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
