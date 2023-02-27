import React from 'react'
import { Table } from 'antd'
// import type { ColumnsType } from 'antd/es/table'
import './antidesing.css'
import { useNavigate } from 'react-router-dom'

interface Config {
  title: string
}

interface Props {
  columns: any
  data: any
  config: Config
}

export const TablaAntidesing = ({ columns, data, config }:Props) => {
  const navigate = useNavigate()

  return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100 flex justify-between">
              <h2 className="font-semibold text-slate-800 text-lg">{config?.title}</h2>
              <button
                onClick={() => navigate('/clientes/nuevo')}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                      className="w-3 h-3 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                  >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  {/* <span className="hidden xs:block ml-2">Add view</span> */}
              </button>
          </header>

          <div className="overflow-x-auto">
              <Table
                  columns={columns}
                  pagination={{ position: ['bottomRight'] }}
                  dataSource={data}
              />
          </div>
      </div>
  )
}
