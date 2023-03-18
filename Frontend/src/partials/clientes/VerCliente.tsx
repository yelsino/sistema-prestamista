import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select, Switch } from 'antd'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { DireccionContext } from '../../Context/direcciones/DireccionContext'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { useNavigate, useParams } from 'react-router-dom'
import { RegistroCliente } from 'types-prestamista'

const VerCliente: React.FC = () => {
  const navigate = useNavigate()
  const [editar, setEditar] = useState(false)
  const [form] = Form.useForm()
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])
  const { id } = useParams()

  const { departamentos, obtenerDepartamentos, obtenerProvincias, obtenerDistritos } = useContext(DireccionContext)
  const { obtenerDetalleCliente, clienteDetalle, actualizarCliente } = useContext(ClienteContext)

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
  // _id?: string;
  // nombres: string;
  // apellidos: string;
  // documento: string;
  // genero: string;
  // celular: string;
  // telefono: string;
  // correo: string;
  // empresa: string;
  // ruc: string;
  // razonSocial: string;
  // estado: EstadoCliente;
  // agente: IUsuario;
  // direccion: IDireccion;
  // ver como actualzar tambien direccion de usuario

  const onFinish = async (values: RegistroCliente) => {
    await actualizarCliente(values)
    navigate('/clientes')
  }

  useEffect(() => {
    obtenerDepartamentos()
  }, [])

  useEffect(() => {
    if (id) {
      obtenerDetalleCliente(id)
    }
  }, [])

  useEffect(() => {
    if (clienteDetalle) {
      form.setFieldsValue({
        documento: clienteDetalle.documento,
        nombres: clienteDetalle.nombres,
        apellidos: clienteDetalle.apellidos,
        genero: clienteDetalle.genero,
        departamento: clienteDetalle.direccion.departamento.nombre,
        provincia: clienteDetalle.direccion.provincia.nombre,
        distrito: clienteDetalle.direccion.distrito.nombre,
        nombreDireccion: clienteDetalle.direccion.nombre,
        referencia: clienteDetalle.direccion.referencia,
        celular: clienteDetalle.celular,
        telefono: clienteDetalle.telefono,
        razonSocial: clienteDetalle.razonSocial,
        ruc: clienteDetalle.ruc,
        empresa: clienteDetalle.empresa,
        correo: clienteDetalle.correo
      })
    }
  }, [clienteDetalle])

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
          <header className=" border-b border-slate-100 flex justify-between  py-4">
              <h2 className="font-semibold text-slate-800 text-lg">
                  NUEVO CLIENTE
              </h2>
                  <Switch
                      checkedChildren="EDITANDO"
                      unCheckedChildren="EDITAR"
                      className="bg-gray-400 text-gray-800"
                      onChange={() => setEditar(!editar)}
                  />
          </header>
          <Form<RegistroCliente>
              form={form}
              name="horizontal_login"
              layout="vertical"
              className=""
              initialValues={{
                documento: '32132123',
                nombres: '',
                apellidos: '',
                genero: '',
                departamento: '',
                provincia: '',
                distrito: '',
                nombreDireccion: '',
                referencia: '',
                celular: '',
                telefono: '',
                razonSocial: '',
                ruc: '',
                empresa: '',
                correo: ''
              }}
              onFinish={onFinish}
              disabled={!editar}
          >
              <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  <Form.Item
                      name="documento"
                      label="Número Documento"
                      rules={[
                        {
                          required: true,
                          message: 'Este campo es requerido!'
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Este campo solo permite números!'
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
                        },
                        {
                          pattern: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
                          message: 'Este campo solo permite letras!'
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
                        },
                        {
                          pattern: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
                          message: 'Este campo solo permite letras!'
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
                      name="nombreDireccion"
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
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Este campo solo permite números!'
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
                          type: 'email',
                          required: true,
                          message: 'Indica un formato válido de correo!'
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
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Este campo solo permite números!'
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

                  <Divider className='col-span-full'>Datos de empresa</Divider>
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
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Este campo solo permite números!'
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
                          className="bg-blue-500 text-white"

                      >
                          Actualizar
                      </Button>
                  )}
              </Form.Item>
          </Form>
      </div>
  )
}

export default VerCliente
