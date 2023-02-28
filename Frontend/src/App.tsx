import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import './css/style.css'
import './charts/ChartjsConfig'
import { useEffect } from 'react'
import { Background } from './pages/Background'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Monedas from './pages/Monedas'
import Prestamos from './pages/Prestamos'
import Cobranzas from './pages/Cobranzas'
import FormCliente from './partials/clientes/FormCliente'
import FormMoneda from './partials/monedas/FormMoneda'
import FormPrestamo from './partials/prestamo/FormPrestamo'
import FormCobranza from './partials/cobranza/FormCobranza'

function App () {
  const location = useLocation()

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname])

  return (
      <>
          <Background>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/clientes/nuevo" element={<FormCliente />} />
                  <Route path="/monedas" element={<Monedas />} />
                  <Route path="/monedas/nuevo" element={<FormMoneda />} />
                  <Route path="/prestamos" element={<Prestamos />} />
                  <Route path="/prestamos/nuevo" element={<FormPrestamo />} />
                  <Route path="/cobranzas" element={<Cobranzas />} />
                  <Route path="/cobranzas/nuevo" element={<FormCobranza />} />
              </Routes>
          </Background>
      </>
  )
}

export default App
