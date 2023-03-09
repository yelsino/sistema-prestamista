// import { BrowserRouter as Router } from 'react-router-dom'
import './css/style.css'
import './charts/ChartjsConfig'
// import { useEffect } from 'react'
import { Background } from './pages/Background'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { StyleProvider } from '@ant-design/cssinjs'
import { ClienteProvider } from './Context/Cliente/ClienteProvider'
import { DireccionProvider } from './Context/direcciones/DireccionProvider'
import RouterApp from './router/RouterApp'
import { AuthProvider } from './Context/Auth/AuthProvider'

function App () {
//   const location = useLocation()

  //   useEffect(() => {
  //     document.querySelector('html').style.scrollBehavior = 'auto'
  //     window.scroll({ top: 0 })
  //     document.querySelector('html').style.scrollBehavior = ''
  //   }, [location.pathname])

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
      <ClienteProvider>
          <DireccionProvider>
              <AuthProvider>
                  <StyleProvider hashPriority="high">
                      <Background>
                          <RouterApp />
                      </Background>
                  </StyleProvider>
              </AuthProvider>
          </DireccionProvider>
      </ClienteProvider>
  )
}

export default App
