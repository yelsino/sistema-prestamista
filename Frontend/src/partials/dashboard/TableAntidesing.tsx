import React from 'react'
import { Space, Table } from 'antd'
import './antidesing.css'
import { useNavigate } from 'react-router-dom'
import Search from 'antd/es/input/Search'

interface Config {
  title: string,
  link: string
}

interface Props {
  columns: any
  data: any
  seleccion?: any
  config: Config
}

export const TablaAntidesing = ({ columns, data, config, seleccion }:Props) => {
  const navigate = useNavigate()

  return (
      <div className="col-span-full xl:col-span-8 bg-white  rounded-sm border  border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100 flex justify-between">
              <h2 className="font-semibold text-slate-800 text-lg">
                  {config?.title}
              </h2>

              <Space className="search-space">
                  <Search
                      placeholder="input search text"
                      enterButton
                      prefix={null}
                  />
              </Space>
              {config.link && (
                  <button
                      onClick={() => navigate(`${config?.link}`)}
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                      <svg
                          className="w-3 h-3 fill-current opacity-50 shrink-0"
                          viewBox="0 0 16 16"
                      >
                          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                  </button>
              )}
          </header>

          <div className="overflow-x-auto">
              <Table
                  rowSelection={seleccion}
                  columns={columns}
                  pagination={{ position: ['bottomRight'] }}
                  dataSource={data}
                  //   title={() => <Space>
                  //     <Search
                  //         placeholder="Buscar cliente"
                  //         allowClear
                  //         enterButton={
                  //             <div className="flex gap-x-2 items-center">
                  //                 <IconoClienteOut estilo="h-5 w-5" /> Buscar
                  //             </div>
                  //         }
                  //         size="large"
                  //         //   onSearch={onSearch}
                  //     />
                  // </Space>}
              />
          </div>
      </div>
  )
}
