import {
  Routes,
  Route,
  BrowserRouter
  // useLocation
} from 'react-router-dom'

import './css/style.css'

import './charts/ChartjsConfig'

// Import pages
import Dashboard from './pages/Dashboard'

function App () {
  // const location = useLocation()

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname])

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
