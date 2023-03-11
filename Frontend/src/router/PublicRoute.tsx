import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAutenticated: boolean
}

const PublicRoute = ({ isAutenticated }: Props) => {
  return <>
  {!isAutenticated ? <Outlet /> : <Navigate to="/" />}</>
}

export default PublicRoute
