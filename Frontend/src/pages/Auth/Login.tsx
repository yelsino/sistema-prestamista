import { Field, Form, Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AuthContext } from '../../Context/auth/AuthContext'

export type QueHacer = 'REGISTRARSE' | 'INICIAR_SESION'

export interface FormLogin {
    nombreUsuario: string
    password: string
}

const Login = () => {
  const { userLogin, loading } = useContext(AuthContext)

  const [noPass, setNoPass] = useState(false)

  // const olvideMisCredenciales = (e) => {
  //   e.stopPropagation()
  // }

  const onSubmit = async (values) => {
    await userLogin(values)
    // actions.resetForm()
  }

  useEffect(() => {
    localStorage.removeItem('noPassword')
  }, [])

  useEffect(() => {
    setNoPass(JSON.parse(localStorage.getItem('noPassword')))
  }, [loading])

  const validAuth = yup.object().shape({
    nombreUsuario: yup.string().required('Nombre de usuario es requerido'),
    password: yup.string().required('Contraseña es requerida')
  })

  const olvideMisCredenciales = (e) => {
    e.stopPropagation()
  }

  return (
      <div className="absolute w-full h-full bg-purple-400 flex justify-center items-center">
          <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
          <div className="fixed w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
          <Formik<FormLogin>
              initialValues={{
                nombreUsuario: 'yelsin',
                password: '!!@12346##@'
              }}
              validationSchema={validAuth}
              onSubmit={onSubmit}
          >
              {({ errors, touched, isSubmitting }) => (
                  <Form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                      <div>
                          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                              Iniciar Sesion
                          </h1>
                          <p className="w-80 text-center text-sm mb-3 font-semibold text-gray-700 tracking-wide cursor-pointer">
                              Bienvenido al sistema de prestamos, indica tus
                              credenciales para realizar tus operaciones!
                          </p>
                      </div>
                      <div className="">
                      <div className='h-8 flex items-end text-rose-500'>{errors.nombreUsuario && touched.nombreUsuario ? errors.nombreUsuario : ''
                          }</div>
                          <Field
                              type="text"
                              name="nombreUsuario"
                              id="nombreUsuario"
                              placeholder="Nombre de usuario"
                              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                          />
                          <div className='text-rose-500 h-8 flex items-end'>{errors.password && touched.password ? errors.password : ''
                          }</div>

                          <Field
                              autoComplete="new-password"
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Contraseña"
                              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none appearance-none"
                          />
                      </div>
                      <div className="text-center mt-6">
                          <button
                              disabled={isSubmitting}
                              type="submit"
                              className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                          >
                              INICIAR
                          </button>
                          <p className="mt-4 text-sm">
                              Aún no tienes una cuenta?{' '}
                              <span className="underline cursor-pointer">
                                  {' '}
                                  Registrese
                              </span>
                          </p>

                          {noPass && (
                    <button
                      type="button"
                      onClick={olvideMisCredenciales}
                      className="mb-3  cursor-default text-center text-sm text-gray-500 hover:text-blue-600"
                    >
                      Olvidé mis contraseña
                    </button>
                          )}
                      </div>
                  </Form>
              )}
          </Formik>
          <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
          <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
  )
}

export default Login
