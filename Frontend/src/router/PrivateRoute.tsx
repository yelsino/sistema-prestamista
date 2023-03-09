import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAutenticated: boolean
}

const PrivateRoute = ({ isAutenticated }: Props) => {
  return <>{!isAutenticated ? <Outlet /> : <Navigate to="/tienda" />}</>
}

export default PrivateRoute
