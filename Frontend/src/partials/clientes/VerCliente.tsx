import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, message, Select, Switch } from 'antd'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { DireccionContext } from '../../Context/direcciones/DireccionContext'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { useParams } from 'react-router-dom'
import { RegistroCliente } from 'types-prestamista'
import './estilo.css'
import { IconPrintSolid } from '../../Components/iconos'
import PrintFicha from './PrintFicha'

const VerCliente: React.FC = () => {
  const [editar, setEditar] = useState(false)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()

  const {
    departamentos,
    provincias,
    distritos,
    obtenerDepartamentos,
    obtenerProvincias,
    obtenerDistritos,
    dispatch
  } = useContext(DireccionContext)
  const { obtenerDetalleCliente, clienteDetalle, actualizarCliente } =
        useContext(ClienteContext)

  const cargarProvincias = async (value: string) => {
    form.resetFields(['provincia'])
    form.resetFields(['distrito'])
    dispatch({
      payload: [],
      type: 'GET_DISTRITO'
    })
    await obtenerProvincias(value)
  }
  const cargarDistritos = async (value: string) =>
    await obtenerDistritos(value)

  const onFinish = async (values: RegistroCliente) => {
    const respuesta = await actualizarCliente({
      ...values,
      _id: clienteDetalle._id,
      direccion: clienteDetalle.direccion._id as any
    })
    if (!respuesta.ok) {
      return messageApi.open({
        type: 'error',
        content: 'Ocurrio un error'
      })
    }
    messageApi.open({
      type: 'success',
      content: 'Has actualizado el cliente'
    })
    setEditar(false)
  }

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
        departamento: clienteDetalle.direccion.departamento._id,
        provincia: clienteDetalle.direccion.provincia._id,
        distrito: clienteDetalle.direccion.distrito._id,
        nombreDireccion: clienteDetalle.direccion.nombre,
        referencia: clienteDetalle.direccion.referencia,
        celular: clienteDetalle.celular,
        telefono: clienteDetalle.telefono,
        razonSocial: clienteDetalle.razonSocial,
        ruc: clienteDetalle.ruc,
        empresa: clienteDetalle.empresa,
        correo: clienteDetalle.correo
      })

      obtenerDepartamentos()
      obtenerProvincias(clienteDetalle.direccion.departamento._id)
      obtenerDistritos(clienteDetalle.direccion.provincia._id)
    }
  }, [clienteDetalle])

  return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
            <header className=" border-b border-slate-100 flex justify-between  py-4 ">
                <h2 className="font-semibold text-slate-800 text-lg flex items-center gap-x-3 ">
                    DATOS CLIENTE
                    <PrintFicha cliente={id}>
                        {' '}
                        <IconPrintSolid estilo="text-purple-500 w-7 h-7 hover:text-purple-700 cursor-pointer" />
                    </PrintFicha>
                </h2>
                <Switch
                    checkedChildren="EDITANDO"
                    unCheckedChildren="EDITAR"
                    className="bg-gray-400 text-gray-800"
                    onChange={() => setEditar(!editar)}
                    checked={editar}
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
                            onChange={cargarProvincias}
                        >
                            {departamentos.map((d) => (
                                <Select.Option key={d._id} value={d._id}>
                                    <p className="text-black">{d.nombre}</p>
                                </Select.Option>
                            ))}
                        </Select>
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
                            disabled={provincias.length === 0 || !editar}
                            size="large"
                            placeholder="Seleccione una provincia"
                            onChange={cargarDistritos}
                        >
                            {provincias.map((d) => (
                                <Select.Option key={d._id} value={d._id}>
                                    <p className="text-black">{d.nombre}</p>
                                </Select.Option>
                            ))}
                        </Select>
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
                            disabled={distritos.length === 0 || !editar}
                            size="large"
                        >
                            {distritos.map((d) => (
                                <Select.Option key={d._id} value={d._id}>
                                    <p className="text-black">{d.nombre}</p>
                                </Select.Option>
                            ))}
                        </Select>
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

                    <Divider className="col-span-full">
                        Datos de empresa
                    </Divider>
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
            {contextHolder}
        </div>
  )
}

export default VerCliente
