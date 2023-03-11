import React, { useState } from 'react'

import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import { Outlet } from 'react-router-dom'

// interface Props {
//     children: React.ReactNode;
// }

export const Background = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
      <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*  Site header */}
              <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
              />

              <main>
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                      {/* {children} */}
                      <Outlet/>
                  </div>
              </main>

          </div>
      </div>
  )
}
