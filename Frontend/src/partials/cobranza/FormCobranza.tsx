import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
import {
  Form,
  Input,
  Modal,
  Space,
  Tag,
  Button,
  message,
  Drawer,
  Dropdown,
  MenuProps
} from 'antd'
import Search from 'antd/es/input/Search'
import {
  IconDownload,
  IconMoney,
  IconoClienteOut
} from '../../Components/iconos'
import { TablaAntidesing } from '../dashboard/TableAntidesing'
import { ColumnsType } from 'antd/es/table'
import { Link, useParams } from 'react-router-dom'
import { PrestamoContext } from '../../Context/prestamo/PrestamoContext'
import { ICuota } from 'types-prestamista'
import { dateToEspanish } from '../../utils/Utils'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { formatToMoney } from '../../utils/formats'
import PrintFicha from '../clientes/PrintFicha'
import './estilo.css'

const FormCobranza: React.FC = () => {
  //   const [empresaState, setEmpresa] = useState(false)

  const [form] = Form.useForm()
  const { id } = useParams()

  const [pagarModal, setPagarModal] = useState(false)
  const [cancelarModal, setCancelarModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  //   const [clientesSearch, setClientesSearch] = useState<ICliente[]>([])

  const {
    obtenerPrestamo,
    obtenerCuotas,
    prestamo,
    cuotas,
    pagarCuotas,
    cancelarPago
  } = useContext(PrestamoContext)
  const { buscarClientes, clientes, dispatch } = useContext(ClienteContext)

  const [cuotasAPagar, setCuotasAPagar] = useState<ICuota[]>([])
  const [cuotaCancelar, setCuotaCancelar] = useState<ICuota>(null)

  const [messageApi, contextHolder] = message.useMessage()

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ICuota[]) => {
      const montoAPagar = selectedRows
        .map((cuota: ICuota) => cuota.monto)
        .reduce((a: number, b: number) => a + b, 0)
      form.setFieldsValue({
        montoAPagar: formatToMoney(montoAPagar)
      })
      setCuotasAPagar(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.estado === 'PAGADO',
      name: record.estado
      //   checked: selectedKeys.includes(record.id)
    })
  }

  const showModal = (cuotas: ICuota[]) => {
    setCuotasAPagar(cuotas)
    setPagarModal(true)
  }

  const showModalCancelar = (cuota: ICuota) => {
    setCuotaCancelar(cuota)
    setCancelarModal(true)
  }

  const realizarPagos = async () => {
    setConfirmLoading(true)
    const respuesta = await pagarCuotas(cuotasAPagar)
    setTimeout(() => {
      setPagarModal(false)
      setConfirmLoading(false)
      if (!respuesta.ok) {
        return messageApi.open({
          type: 'error',
          content: 'Ha ocurrido un error'
        })
      }
      messageApi.open({
        type: 'success',
        content: 'Has realizado un pago'
      })
    }, 1000)
  }

  const cancelarPagoCuota = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setCancelarModal(false)
      setConfirmLoading(false)
      cancelarPago(cuotaCancelar)
      messageApi.open({
        type: 'success',
        content: 'Se ha cancelado el pago'
      })
    }, 1000)
  }

  const onSearch = async (termino: string) => {
    if (termino.length < 3) return
    await buscarClientes(termino)
  }

  const seleccionarCliente = async (id: string) => {
    const resultado = await obtenerPrestamo(id)
    if (!resultado.ok) {
      return messageApi.open({
        type: 'error',
        content: 'El cliente no tiene prestamos'
      })
    }
  }

  useEffect(() => {
    obtenerPrestamo(id)
    dispatch({
      payload: [],
      type: 'GET_CLIENTES'
    })
  }, [])

  useEffect(() => {
    if (prestamo) {
      obtenerCuotas(id)
      form.setFieldsValue({
        documento: prestamo.cliente.documento,
        nombreCompleto:
                    prestamo.cliente.nombres + ' ' + prestamo.cliente.apellidos,
        montoPrestado: 'S/. ' + prestamo.monto,
        formaPago: prestamo.formaPago.nombre,
        tipoMoneda: prestamo.moneda.nombre
      })
    }
  }, [prestamo])

  const columns: ColumnsType<ICuota> = [
    {
      title: 'Numero',
      dataIndex: 'numeroCuota',
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Vencimiento',
      dataIndex: 'fechaLimite',
      align: 'center',
      render: (fechaLimite: Date) => <p>{dateToEspanish(fechaLimite)}</p>
    },
    {
      title: 'Fecha de Pago',
      dataIndex: 'fechaPago',
      align: 'left',
      render: (fechaLimite: Date) => <p>{dateToEspanish(fechaLimite)}</p>
    },
    {
      title: 'Monto cuota',
      dataIndex: 'monto',
      align: 'center',
      render: (monto: number) => <p>S/. {formatToMoney(monto)}</p>
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      align: 'center',
      render: (estado: string) => (
                <div key={estado} className="text-2xl">
                    {estado === 'PENDIENTE'
                      ? (
                        <Tag color="yellow">Pendiente</Tag>
                        )
                      : (
                        <Tag color="green">Pagado</Tag>
                        )}
                </div>
      )
    },
    {
      title: 'Acción',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (rowCuota: ICuota) => (
                <>
                    {rowCuota.estado === 'PENDIENTE'
                      ? (
                        <a
                            className="p-2"
                            type="primary"
                            onClick={() => {
                              showModal([rowCuota])
                            }}
                        >
                            pagar
                        </a>
                        )
                      : (
                        <Dropdown
                            overlayStyle={{
                              width: 170
                            }}
                            menu={{ items: itemsAction(rowCuota, showModalCancelar) }}
                        >
                            <div
                                className="flex justify-center cursor-pointer  text-purple-400 hover:text-purple-500 ease-in-out duration-300"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Space>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                        />
                                    </svg>
                                </Space>
                            </div>
                        </Dropdown>
                        )}
                </>
      )
    }
  ]

  useEffect(() => {
    if (clientes.length > 1) {
      setOpenDrawer(true)
    }
  }, [clientes])

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
                        onSearch={onSearch}
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
                  moneda: '',
                  montoAPagar: '',
                  tipoMoneda: ''
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

                <div className="pt-5  gap-y-5  flex flex-col ">
                    <TablaAntidesing
                        columns={columns}
                        data={cuotas}
                        seleccion={rowSelection}
                        config={{
                          title: 'Cuotas de prestamo',
                          link: ''
                        }}
                    />
                    <Form.Item name="montoAPagar" label="Monto a total a pagar">
                        <Input
                            disabled
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="text"
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
                            onClick={() => showModal(cuotasAPagar)}
                        >
                            Pagar Seleccionados
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <Modal
                title="CONFIRMA EL PAGO"
                open={pagarModal}
                onOk={realizarPagos}
                confirmLoading={confirmLoading}
                onCancel={() => setPagarModal(false)}
                footer={[
                    <Button key="back" onClick={() => setPagarModal(false)}>
                        Cerrar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmLoading}
                        onClick={realizarPagos}
                    >
                        Confirmar
                    </Button>
                ]}
                // centered
            >
                {cuotasAPagar.map((cuota, index) => (
                    <div
                        className={` py-3 ${
                            index === cuotasAPagar.length - 1 ? '' : 'border-b'
                        }`}
                        key={cuota._id}
                    >
                        <p>Numero cuota: {cuota?.numeroCuota}</p>
                        <p>
                            Fecha de vencimiento:{' '}
                            {dateToEspanish(cuota?.fechaLimite)}
                        </p>
                        <p>Monto de cuota: {formatToMoney(cuota?.monto)}</p>
                    </div>
                ))}
            </Modal>

            <Modal
                title="CANCELAR EL PAGO"
                open={cancelarModal}
                onOk={cancelarPagoCuota}
                confirmLoading={confirmLoading}
                onCancel={() => setCancelarModal(false)}
                footer={[
                    <Button key="back" onClick={() => setCancelarModal(false)}>
                        Cerrar
                    </Button>,
                    <Button
                        key="submit"
                        className="bg-red-500 text-white"
                        style={{
                          backgroundColor: '#f5222d',
                          borderColor: '#f5222d',
                          color: '#fff'
                        }}
                        loading={confirmLoading}
                        onClick={cancelarPagoCuota}
                    >
                        Confirmar
                    </Button>
                ]}
                // centered
            >
                <div className={' py-3 '} key={cuotaCancelar?._id}>
                    <p>Numero cuota: {cuotaCancelar?.numeroCuota}</p>
                    <p>
                        Fecha de vencimiento:{' '}
                        {dateToEspanish(cuotaCancelar?.fechaLimite)}
                    </p>
                    <p>Monto de cuota: {cuotaCancelar?.monto}</p>
                </div>
            </Modal>

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
                            onClick={() => seleccionarCliente(cliente._id)}
                            className="py-1"
                        >
                            seleccionar
                        </a>
                    </div>
                ))}
            </Drawer>
            {contextHolder}
        </div>
  )
}

export default FormCobranza

const itemsAction = (rowCuota: ICuota, showModalCancelar): MenuProps['items'] => {
  return [
    {
      key: '1',
      label: (
                <PrintFicha cliente={rowCuota}>
                    <div className="flex gap-x-3 ">
                        {/* <IconMoney estilo="w-5 h-5 text-purple-500" /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 text-purple-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                            />
                        </svg>
                        Imprimir Vaucher
                    </div>
                </PrintFicha>
      )
    },
    {
      key: '2',
      label: (
                    <div
                      onClick={() => showModalCancelar(rowCuota)}
                      className="flex gap-x-3 hover:text-purple-500 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-purple-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Cancelar Pago
                    </div>
      )
    }
  ]
}
