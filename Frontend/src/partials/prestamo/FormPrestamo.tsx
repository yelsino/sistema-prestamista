import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space
} from 'antd'
import Search from 'antd/es/input/Search'
import { IconoClienteOut } from '../../Components/iconos'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { PrestamoContext } from '../../Context/prestamo/PrestamoContext'
import { ICliente, IPrestamo } from 'types-prestamista'
import { MonedaContext } from '../../Context/moneda/MonedaContext'
import './estilos.css'
import { AuthContext } from '../../Context/auth/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatToMoney } from '../../utils/formats'
import ArchivoContrato from './ArchivoContrato'
import { useFile } from '../../Hooks/useFile'

const FormPrestamos: React.FC = () => {
  //   const [empresaState, setEmpresa] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})
  const [modal, setModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { generateDocument } = useFile('https://res.cloudinary.com/dwkfj5sxb/raw/upload/v1679439788/SISTEMA-PRESTAMOS/ContratoTemplate_bja3pg.docx')
  const { state } = useLocation()

  const { buscarClientes, obtenerCliente, clientes, cliente, dispatch } =
        useContext(ClienteContext)
  const { generarPrestamo, obtenerPrestamo, obtenerFormasPago, formasPago } =
        useContext(PrestamoContext)
  const { obtenerMoneda, monedas } = useContext(MonedaContext)
  const { user } = useContext(AuthContext)

  const [messageApi, contextHolder] = message.useMessage()
  const [openDrawer, setOpenDrawer] = useState(false)

  const onSearch = async (termino: string) => {
    if (termino.length < 3) {
      return messageApi.open({
        type: 'error',
        content: 'Minimo 3 caracteres'
      })
    }
    const resultado = await buscarClientes(termino)

    if (!resultado.ok) {
      return messageApi.open({
        type: 'error',
        content: 'No se encontraron resultados'
      })
    }

    if (resultado.data.length === 1) {
      form.setFieldsValue({
        documento: clientes[0].documento,
        nombreCompleto:
                    clientes[0].nombres + ' ' + clientes[0].apellidos
      })
    }

    if (resultado.data.length > 1) {
      setOpenDrawer(true)
    }
  }

  const onFinish = async () => {
    setConfirmLoading(true)
    const values = await form.validateFields()

    const prestamo = {
      numero: values.numero,
      cliente: cliente._id as any,
      monto: values.monto,
      interes: values.interes,
      montoTotal: values.montoTotal,
      moneda: values.moneda,
      estado: '' as any,
      agente: user._id as any,
      numeroCuotas: values.cuotas,
      formaPago: values.formaPago,
      fechaEmision: values.fechaEmision,
      montoMora: values.montoMora
    }

    const res = await generarPrestamo(prestamo)

    setTimeout(async () => {
      setModal(false)
      setConfirmLoading(false)
      if (res.ok) {
        messageApi.open({
          type: 'success',
          content: 'Registro existoso!'
        })
        const prestamo = await obtenerPrestamo(res.data._id)
        const { cliente, monto, fechaEmision, interes, formaPago } = prestamo.data
        generateDocument({
          nombrePrestamista: cliente.nombres + ' ' + cliente.apellidos,
          direccionPrestamista: cliente.direccion.nombre,
          nombrePrestatario: user.nombres + ' ' + user.apellidos,
          direccionPrestatario: 'Jr primavera 1555',
          montoPrestado: monto,
          fechaLimiteDias: fechaEmision,
          porcentajePrestamo: interes,
          formaPago: formaPago.nombre,
          garantia: 'TERRENO 255 M2'
        })
        navigate('/prestamos')
      } else {
        messageApi.open({
          type: 'error',
          content: 'Error al registrar!'
        })
      }
    }, 1000)
  }

  const seleccionarCliente = (cliente: ICliente) => {
    dispatch({
      payload: cliente,
      type: 'SELECT_CLIENTE'
    })
  }

  useEffect(() => {
    if (state) {
      obtenerCliente(state.cliente)
    }
  }, [])

  useEffect(() => {
    dispatch({
      payload: [],
      type: 'GET_CLIENTES'
    })
    forceUpdate({})
    obtenerMoneda()
    obtenerFormasPago()
  }, [])

  useEffect(() => {
    if (cliente) {
      form.setFieldsValue({
        documento: cliente.documento,
        nombreCompleto: cliente.nombres + ' ' + cliente.apellidos
      })
    }
  }, [cliente])

  const handleFormValuesChange = (changedValues, values: any) => {
    if (
      'monto' in changedValues ||
            'interes' in changedValues ||
            'cuotas' in changedValues
    ) {
      const monto: number = values.monto || 0
      const interes: number = values.interes || 0
      const cuotas: number = values.cuotas || 0
      const valorInteres: number = monto * (interes / 100)
      const montoTotal: number = Number(monto) + valorInteres
      const valorCuota: number = Math.round(montoTotal / cuotas)
      form.setFieldsValue({
        montoTotal,
        valorInteres,
        valorCuota: formatToMoney(valorCuota)
      })
    }
  }

  const config = {
    rules: [
      {
        type: 'object' as const,
        required: true,
        message: 'Please select time!'
      }
    ]
  }

  return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200  py-4 px-5">
            <header className=" border-b border-slate-100 flex justify-between  py-4">
                <h2 className="font-semibold text-slate-800 text-lg">
                    REGISTRAR PRESTAMO
                </h2>
              <ArchivoContrato/>
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
                size="large"
                className=""
                initialValues={{
                  documento: '',
                  nombreCompleto: '',
                  monto: 0,
                  formaPago: '',
                  interes: 0,
                  montoMora: 0,
                  cuotas: 0,
                  moneda: '',
                  fechaEmision: '',
                  valorCuota: 0,
                  valorInteres: 0,
                  montoTotal: 0
                }}
                onFinish={() => setModal(true)}
                onValuesChange={handleFormValuesChange}
            >
                <div className="pt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                    <Form.Item name="documento" label="N° Documento">
                        <Input
                            // className='bg-red-500'
                            disabled
                            style={{
                              background: '#f1f1f1',
                              color: '#000'
                            }}
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="ej: 77068132"
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
                        />
                    </Form.Item>
                    <Form.Item
                        name="monto"
                        label="Monto a prestar"
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es requerido!'
                          }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            max={999999}
                            step={0.01}
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="text"
                            placeholder="EJ: Perez Perez"
                        />
                    </Form.Item>

                    <Form.Item
                        name="interes"
                        label="Interes"
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es requerido!'
                          }
                        ]}
                    >

                        <InputNumber
                            min={0}
                            max={999999}
                            step={0.1}
                            style={{ width: '100%' }}
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="cuotas"
                        label="Número de Cuotas"
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es requerido!'
                          }
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={999999}
                            style={{ width: '100%' }}
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="montoMora"
                        label="Mora por día"
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es requerido!'
                          }
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={999999}
                            step={0.01}
                            style={{ width: '100%' }}
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="0"
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
                        <Select>
                            {formasPago.map((v) => (
                                <Select.Option key={v._id} value={v._id}>
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
                        <Select>
                            {monedas.map((moneda) => (
                                <Select.Option
                                    key={moneda._id}
                                    value={moneda._id}
                                >
                                    <div className="flex items-center text-blue-400">
                                        <span>{moneda.nombre}</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="fechaEmision"
                        label="Fecha de Emisión"
                        {...config}
                        style={{ width: '100%' }}
                    >
                        <DatePicker size="large" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="valorCuota"
                        label="Valor por Cuota"
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es requerido!'
                          }
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={999999}
                            step={0.01}
                            style={{ width: '100%' }}
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                      style={{ width: '100%' }}
                      name="valorInteres" label="Valor Interes">
                        <InputNumber
                          style={{ width: '100%' }}
                            disabled
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            min={0}
                            max={999999}
                            step={0.01}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                      style={{ width: '100%' }}
                      name="montoTotal" label="Monto Total">
                        <InputNumber
                          style={{ width: '100%' }}
                            disabled
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            min={0}
                            max={999999}
                            step={0.01}
                            placeholder="0"
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
            <Drawer
                title="UPS! HAY VARIAS COINCIDENCIAS"
                placement="right"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                //   size="large"
            >
                {clientes.map((cliente) => (
                    <div
                        className="flex justify-between items-center border-b py-3"
                        key={cliente._id}
                    >
                        <p className="truncate">
                            {cliente.nombres} {cliente.apellidos}
                        </p>
                        <a
                            onClick={() => seleccionarCliente(cliente)}
                            className="py-1"
                        >
                            seleccionar
                        </a>
                    </div>
                ))}
            </Drawer>

            <Modal
              title="CONFIRMAR REGISTRO"
              open={modal}
              onOk={onFinish}
              confirmLoading={confirmLoading}
              onCancel={() => setModal(false)}
              footer={[
                  <Button key="back" onClick={() => setModal(false)}>
                      Cerrar
                  </Button>,
                  <Button
                      key="submit"
                      type="primary"
                      loading={confirmLoading}
                      onClick={onFinish}
                  >
                      Confirmar
                  </Button>
              ]}
              // centered
          >
              <p>¿Estas seguro de registrar prestamo en la base de datos?</p>
          </Modal>
            {contextHolder}
        </div>
  )
}

export default FormPrestamos
