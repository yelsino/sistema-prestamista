import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Space, Tag, Button, message, Drawer } from 'antd'
import Search from 'antd/es/input/Search'
import { IconoClienteOut } from '../../Components/iconos'
import { TablaAntidesing } from '../dashboard/TableAntidesing'
import { ColumnsType } from 'antd/es/table'
import { useParams } from 'react-router-dom'
import { PrestamoContext } from '../../Context/prestamo/PrestamoContext'
import { ICuota } from 'types-prestamista'
import { dateToEspanish } from '../../utils/Utils'
import { ClienteContext } from '../../Context/cliente/ClienteContext'
import { formatToMoney } from '../../utils/formats'

const FormCobranza: React.FC = () => {
//   const [empresaState, setEmpresa] = useState(false)

  const [form] = Form.useForm()
  const { id } = useParams()

  const [pagarModal, setPagarModal] = useState(false)
  const [cancelarModal, setCancelarModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  //   const [clientesSearch, setClientesSearch] = useState<ICliente[]>([])

  const { obtenerPrestamo, obtenerCuotas, prestamo, cuotas, pagarCuotas, cancelarPago } = useContext(PrestamoContext)
  const { buscarClientes, clientes, dispatch } = useContext(ClienteContext)

  const [cuotasAPagar, setCuotasAPagar] = useState<ICuota[]>([])
  const [cuotaCancelar, setCuotaCancelar] = useState<ICuota>(null)

  const [messageApi, contextHolder] = message.useMessage()

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows:ICuota[]) => {
      const montoAPagar = selectedRows.map((cuota:ICuota) => cuota.monto).reduce((a:number, b:number) => a + b, 0)
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

  const showModal = (cuotas:ICuota[]) => {
    setCuotasAPagar(cuotas)
    setPagarModal(true)
  }

  const showModalCancelar = (cuota:ICuota) => {
    setCuotaCancelar(cuota)
    setCancelarModal(true)
  }

  const realizarPagos = async () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setPagarModal(false)
      setConfirmLoading(false)
      pagarCuotas(cuotasAPagar)
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

  const seleccionarCliente = async (id:string) => {
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
        nombreCompleto: prestamo.cliente.nombres + ' ' + prestamo.cliente.apellidos,
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
      render: (estado: string) => <div key={estado} className='text-2xl'>
      {estado === 'PENDIENTE' ? <Tag color='yellow'>Pendiente</Tag> : <Tag color='green'>Pagado</Tag>}
    </div>
    },
    {
      title: 'Accion',
      key: 'action',
      align: 'center',

      render: (record:ICuota) => <>
        {
            record.estado === 'PENDIENTE'
              ? <a className='p-2' type="primary" onClick={() => { showModal([record]) }}>
            pagar
          </a>
              : <span className='p-2 no-underline text-red-400 cursor-pointer' onClick={() => { showModalCancelar(record) }}>
          cancelar
        </span>
        }
      </>
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
                    className='flex justify-between items-center border-b py-3'
                    key={cliente._id}>
                    <p className='truncate'>{cliente.nombres} {cliente.apellidos}</p>
                    <a
                        onClick={() => seleccionarCliente(cliente._id)}
                        className='py-1'>seleccionar</a>
                </div>
              ))}
          </Drawer>
          {contextHolder}
      </div>
  )
}

export default FormCobranza
