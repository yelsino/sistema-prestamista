import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Switch } from 'antd'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { DireccionContext } from '../../Context/direcciones/DireccionContext'

const FormCliente: React.FC = () => {
  const [empresaState, setEmpresa] = useState(false)

  const [form] = Form.useForm()
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])

  const { departamentos, obtenerDepartamentos, obtenerProvincias, obtenerDistritos } = useContext(DireccionContext)

  const onFinish = (values: any) => {
    console.log(values)

    const nuevoCliente = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      ducumento: values.ducumento,
      genero: values.genero,
      celular: values.celular,
      telefono: values.telefono,
      correo: values.correo,
      empresa: values.nombreComercial,
      ruc: values.ruc,
      razonSocial: values.razonSocial,
      estado: 'SIN_CREDITO',
      agente: '321321321312'
    }

    const nuevaDireccion = {
      departamento: values.departamento,
      provincia: values.provincia,
      distrito: values.distrito,
      direccion: values.direccion,
      referencia: values.referencia
    }
    console.log(nuevoCliente, nuevaDireccion)
  }

  const cargarProvincias = async (value: string) => {
    form.resetFields(['provincia'])
    form.resetFields(['distrito'])
    setDistritos([])
    const provincias = await obtenerProvincias(value)
    const provinciaOptions = provincias.data.map((provincia) => ({
      label: provincia.nombre,
      value: provincia._id
    }))
    setProvincias(provinciaOptions)
  }
  const cargarDistritos = async (value: string) => {
    const distritos = await obtenerDistritos(value)
    const distritoOptions = distritos.data.map((distrito) => ({
      label: distrito.nombre,
      value: distrito._id
    }))
    setDistritos(distritoOptions)
  }

  useEffect(() => {
    obtenerDepartamentos()
  }, [])

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  NUEVO CLIENTE
              </h2>
                  <Switch
                      checkedChildren="CON EMPRESA"
                      unCheckedChildren="SIN EMPRESA"
                      className="bg-gray-400 text-gray-800"
                      onChange={() => setEmpresa(!empresaState)}
                  />
          </header>
          <Form
              form={form}
              name="horizontal_login"
              layout="vertical"
              className=""
              initialValues={{
                ducumento: '',
                nombres: '',
                apellidos: '',
                genero: '',
                departamento: '',
                provincia: '',
                distrito: '',
                direccion: '',
                referencia: '',
                celular: '',
                telefono: '',
                razonSocial: '',
                ruc: '',
                nombreComercial: '',
                correo: ''

              }}
              onFinish={onFinish}
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
                      name="genero"
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
                      label="Departamento"
                      name="departamento"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >

                      <Select
                          size="large"
                          placeholder="Seleccione un departamento"
                          options={departamentos.map((d) => ({ value: d._id, label: d.nombre }))}
                          onChange={cargarProvincias}
                      />
                  </Form.Item>

                  <Form.Item
                      label="Provincia"
                      name="provincia"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Select
                          disabled={provincias.length === 0}
                          size="large"
                          placeholder="Seleccione una provincia"
                          options={provincias}
                          onChange={cargarDistritos}
                      />
                  </Form.Item>

                  <Form.Item
                      label="Distrito"
                      name="distrito"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        }
                      ]}
                  >
                      <Select
                          disabled={distritos.length === 0}
                          size="large"
                          options={distritos}
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
                      name="referencia"
                      label="Referencia"
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
                      name="correo"
                      label="Correo"
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
                          placeholder="EJ: juan@gmail.com"
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

                {
                    empresaState && (
                        <>
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
                        </>
                    )
                }

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

export default FormCliente
