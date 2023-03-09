import { Suspense, useContext, useEffect } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import LoadingPage from '../Components/LoadinPage'
import { AuthContext } from '../Context/Auth/AuthContext'
import Login from '../pages/Auth/Login'
import Clientes from '../pages/Clientes'
import Cobranzas from '../pages/Cobranzas'
import Dashboard from '../pages/Dashboard'
import Monedas from '../pages/Monedas'
import Prestamos from '../pages/Prestamos'
import FormCliente from '../partials/clientes/FormCliente'
import FormCobranza from '../partials/cobranza/FormCobranza'
import FormMoneda from '../partials/monedas/FormMoneda'
import FormPrestamos from '../partials/prestamo/FormPrestamo'
import PublicRoute from './PublicRoute'

const RouterApp = () => {
  const { checking, logged, verificarToken } = useContext(AuthContext)

  const routes = [
    {
      path: '/auth',
      element: <PublicRoute isAutenticated={logged} />,
      children: [
        {
          path: '/auth/login',
          element: <Login />
        }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/" />
    },
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/clientes',
      element: <Clientes />
    },
    {
      path: '/clientes/nuevo',
      element: <FormCliente />
    },
    {
      path: '/monedas',
      element: <Monedas />
    },
    {
      path: '/monedas/nuevo',
      element: <FormMoneda />
    },
    {
      path: '/prestamos',
      element: <Prestamos />
    },
    {
      path: '/prestamos/nuevo',
      element: <FormPrestamos />
    },
    {
      path: '/cobranzas',
      element: <Cobranzas />
    },
    {
      path: '/cobranzas/nuevo',
      element: <FormCobranza />
    },
    {
      path: '*',
      element: <div>404</div>
    }
  ]

  const element = useRoutes(routes)
  useEffect(() => {
    verificarToken()
  }, [verificarToken])

  if (checking) {
    return <LoadingPage />
  }

  return (
    <>
      <Suspense fallback={null}>{element}</Suspense>
    </>
  )
}

export default RouterApp
