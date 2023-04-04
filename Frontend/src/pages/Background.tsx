import React, { useContext } from 'react'

import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import { Link, Outlet } from 'react-router-dom'
import { InterfazContext } from '../Context/interfaz/InterfazContext'

// interface Props {
//     children: React.ReactNode;
// }

export const Background = () => {
  const { sidebar, dispatchInterfaz } = useContext(InterfazContext)

  const setSearchModalOpen = (estado:boolean) => {
    dispatchInterfaz({
      payload: estado,
      type: 'SHOW_SIDEBAR'
    })
  }

  return (
      <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebar} setSidebarOpen={setSearchModalOpen} />

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*  Site header */}
              <Header
                  sidebarOpen={sidebar}
                  setSidebarOpen={setSearchModalOpen}
              />

              <main>
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    <div className='text-gray-400'>
                        <Link className='hover:text-blue-500' to="/app">Dashboard /</Link>
                        <Link className='hover:text-blue-500' to="/clientes"> Clientes /</Link>
                        <Link className='hover:text-blue-500' to="/prestamos"> Prestamos</Link>

                    </div>
                      {/* {children} */}
                      <Outlet/>
                  </div>
              </main>

          </div>
      </div>
  )
}
