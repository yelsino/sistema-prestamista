import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Background } from '../pages/Background'

interface Props {
  isAutenticated: boolean
}

const PrivateRoute = ({ isAutenticated }: Props) => {
  const location = useLocation()

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname])

  return <>
  {isAutenticated ? <Background /> : <Navigate to="/auth/login" />}</>
}

export default PrivateRoute
