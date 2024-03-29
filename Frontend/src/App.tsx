import './css/style.css'
import './charts/ChartjsConfig'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import RouterApp from './router/RouterApp'
import { BrowserRouter as Router } from 'react-router-dom'
// import { ClienteProvider } from './Context/cliente/ClienteProvider'
// import { DireccionProvider } from './Context/direcciones/DireccionProvider'
// import { StyleProvider } from '@ant-design/cssinjs'
import { AuthProvider } from './Context/auth/AuthProvider'
import { StyleProvider } from '@ant-design/cssinjs'
import { ClienteProvider } from './Context/cliente/ClienteProvider'
import { DireccionProvider } from './Context/direcciones/DireccionProvider'
import { PrestamoProvider } from './Context/prestamo/PrestamoProvider'
import { MonedaProvider } from './Context/moneda/MonedaProvider'
import { InterfazProvider } from './Context/interfaz/InterfazProvider'

function App () {
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
        <InterfazProvider>
            <AuthProvider>
                <ClienteProvider>
                    <DireccionProvider>
                        <MonedaProvider>
                            <PrestamoProvider>
                                <StyleProvider hashPriority="high">
                                    <Router>
                                        <RouterApp />
                                    </Router>
                                </StyleProvider>
                            </PrestamoProvider>
                        </MonedaProvider>
                    </DireccionProvider>
                </ClienteProvider>
            </AuthProvider>
        </InterfazProvider>
  )
}

export default App
