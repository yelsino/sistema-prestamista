import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'

const FormCliente: React.FC = () => {
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
                  NUEVO CLIENTE
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
                          Log in
                      </Button>
                  )}
              </Form.Item>
          </Form>
      </div>
  )
}

export default FormCliente

const departamentosPeru = [
  {
    nombre: 'Amazonas',
    distritos: [
      'Chachapoyas',
      'Asunción',
      'Balsas',
      'Cheto',
      'Chiliquin',
      'Churuja',
      'Coronel Portillo',
      'Cuispes',
      'Florida',
      'Granada',
      'Huancas',
      'Huandoval',
      'Lonya Chico',
      'Luya',
      'Manga',
      'Mariscal Castilla',
      'Molinopampa',
      'Montevideo',
      'Olleros',
      'Olambe',
      'Pisuquia',
      'Providencia',
      'Quinjalca',
      'San Francisco de Daguas',
      'San Isidro de Maino',
      'Soloco',
      'Sonche',
      'Valera',
      'Yambrasbamba'
    ],
    provincias: [
      'Chachapoyas',
      'Bagua',
      'Bongará',
      'Condorcanqui',
      'Luya',
      'Rodríguez de Mendoza',
      'Utcubamba'
    ]
  },
  {
    nombre: 'Áncash',
    distritos: [
      'Huaraz',
      'Aija',
      'Antonio Raymondi',
      'Asunción',
      'Bolognesi',
      'Carhuaz',
      'Carlos Fermín Fitzcarrald',
      'Casma',
      'Corongo',
      'Huari',
      'Huarmey',
      'Huaylas',
      'Mariscal Luzuriaga',
      'Ocros',
      'Pallasca',
      'Pomabamba',
      'Recuay',
      'Santa',
      'Sihuas',
      'Yungay'
    ],
    provincias: [
      'Huaraz',
      'Aija',
      'Antonio Raymondi',
      'Asunción',
      'Bolognesi',
      'Carhuaz',
      'Carlos Fermín Fitzcarrald',
      'Casma',
      'Corongo',
      'Huari',
      'Huarmey',
      'Huaylas',
      'Mariscal Luzuriaga',
      'Ocros',
      'Pallasca',
      'Pomabamba',
      'Recuay',
      'Santa',
      'Sihuas',
      'Yungay'
    ]
  },
  {
    nombre: 'Apurímac',
    distritos: [
      'Abancay',
      'Andahuaylas',
      'Antabamba',
      'Cotabambas',
      'Chalhuanca',
      'Grau'
    ],
    provincias: [
      'Abancay',
      'Andahuaylas',
      'Antabamba',
      'Cotabambas',
      'Chincheros',
      'Grau'
    ]
  },
  {
    nombre: 'Arequipa',
    distritos: [
      'Arequipa',
      'Alto Selva Alegre',
      'Cayma',
      'Cerro Colorado',
      'Characato',
      'Chiguata',
      'Jacobo Hunter',
      'La Joya',
      'Mariano Melgar',
      'Miraflores',
      'Mollebaya',
      'Paucarpata',
      'Pocsi',
      'Polobaya',
      'Quequeña',
      'Sabandía',
      'Sachaca',
      'San Juan de Siguas',
      'San Juan de Tarucani',
      'Santa Isabel de Siguas',
      'Santa Rita de Siguas',
      'Socabaya',
      'Tiabaya',
      'Uchumayo',
      'Vitor',
      'Yanahuara',
      'Yarabamba',
      'Yura'
    ],
    provincias: [
      'Arequipa',
      'Camaná',
      'Caravelí',
      'Castilla',
      'Caylloma',
      'Condesuyos',
      'Islay',
      'La Unión'
    ]
  },
  {
    nombre: 'Ayacucho',
    distritos: [
      'Acocro',
      'Acos Vinchos',
      'Carmen Alto',
      'Chiara',
      'Ocros',
      'Pacaycasa',
      'Quinua',
      'San José de Ticllas',
      'San Juan Bautista',
      'Santiago de Pischa',
      'Socos',
      'Tambillo',
      'Vinchos'
    ],
    provincias: [
      'Huamanga',
      'Cangallo',
      'Huanca Sancos',
      'Huanta',
      'La Mar',
      'Lucanas',
      'Parinacochas',
      'Páucar del Sara Sara',
      'Sucre',
      'Víctor Fajardo',
      'Vilcas Huamán'
    ]
  },
  {
    nombre: 'Cajamarca',
    distritos: [
      'Asunción',
      'Chetilla',
      'Cospán',
      'Encañada',
      'Jesús',
      'Llacanora',
      'Los Baños del Inca',
      'Magdalena',
      'Matara',
      'Namora',
      'San Juan',
      'San Pedro',
      'Santiago de Chilcas',
      'Santo Tomás',
      'Socota',
      'Tolón'
    ],
    provincias: [
      'Cajamarca',
      'Cajabamba',
      'Celendín',
      'Chota',
      'Contumazá',
      'Cutervo',
      'Hualgayoc',
      'Jaén',
      'San Ignacio',
      'San Marcos',
      'San Miguel',
      'San Pablo',
      'Santa Cruz'
    ]
  },
  {
    nombre: 'Callao',
    distritos: [
      'Bellavista',
      'Callao',
      'Carmen de la Legua-Reynoso',
      'La Perla',
      'La Punta',
      'Ventanilla'
    ],
    provincias: [
      'Callao'
    ]
  },
  {
    nombre: 'Cusco',
    distritos: [
      'Ccorca',
      'Cusco',
      'Poroy',
      'San Jerónimo',
      'San Sebastián',
      'Santiago',
      'Saylla',
      'Wanchaq'
    ],
    provincias: [
      'Cusco',
      'Acomayo',
      'Anta',
      'Calca',
      'Canas',
      'Canchis',
      'Chumbivilcas',
      'Espinar',
      'La Convención',
      'Paruro',
      'Paucartambo',
      'Quispicanchi',
      'Urubamba'
    ]
  },
  {
    nombre: 'Huancavelica',
    distritos: [
      'Acobambilla',
      'Acoria',
      'Conayca',
      'Cuenca',
      'Huachocolpa',
      'Huando',
      'Huayllahuara',
      'Izcuchaca',
      'Laria',
      'Manta',
      'Mariscal Cáceres',
      'Moya',
      'Nuevo Occoro',
      'Palca',
      'Pilchaca',
      'Vilca'
    ],
    provincias: [
      'Huancavelica',
      'Acobamba',
      'Angaraes',
      'Castrovirreyna',
      'Churcampa',
      'Huaytará',
      'Tayacaja'
    ]
  }
]

console.log(departamentosPeru)
// { nombre: "Huanuco" },
// { nombre: "Ica" },
// { nombre: "Junin" },
// { nombre: "La Libertad" },
// { nombre: "Lambayeque" },
// { nombre: "Lima" },
// { nombre: "Loreto" },
// { nombre: "Madre de Dios" },
// { nombre: "Moquegua" },
// { nombre: "Pasco" },
// { nombre: "Piura" },
// { nombre: "Puno" },
// { nombre: "San Martin" },
// { nombre: "Tacna" },
// { nombre: "Tumbes" },
// { nombre: "Ucayali" }
