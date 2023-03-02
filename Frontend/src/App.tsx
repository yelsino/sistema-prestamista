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
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

function App () {
  const location = useLocation()

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname])

  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyCznRY1k9W7if_78DXalahupS7Ax27MlD0',
    authDomain: 'sistema-pretamista.firebaseapp.com',
    projectId: 'sistema-pretamista',
    storageBucket: 'sistema-pretamista.appspot.com',
    messagingSenderId: '312220321790',
    appId: '1:312220321790:web:8d48047aa1fc88b0bae2af',
    measurementId: 'G-NNLRGNNVFV'
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  getAnalytics(app)

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
