import React from 'react'

function DataTable () {
  const [usuarios] = React.useState(data)

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between">
        <h2 className="font-semibold text-slate-800">Top Clientes</h2>
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                      <svg
                          className="w-3 h-3 fill-current opacity-50 shrink-0"
                          viewBox="0 0 16 16"
                      >
                          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="hidden xs:block ml-2">Add view</span>
                  </button>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Documento</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Nombres</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Apellidos</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Genero</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Celular</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {
                usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                  >
                <td className="p-2">
                  <div className="flex items-center">
                    {usuario.documento}
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{usuario.nombres}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{usuario.apellidos}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{usuario.genero}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{usuario.telefono}</div>
                </td>
              </tr>
                ))
              }

            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default DataTable

const data = [
  {
    id: 1,
    documento: '77068139',
    nombres: 'Juan Carlos',
    apellidos: 'Perez Perez',
    telefono: '123456789',
    email: 'juancarlos@gmail.com',
    genero: 'Masculino'
  },
  {
    id: 2,
    documento: '77068139',
    nombres: 'Ana Maria',
    apellidos: 'Rodriguez Gomez',
    telefono: '987654321',
    email: 'anamaria@gmail.com',
    genero: 'Femenino'
  },
  {
    id: 3,
    documento: '77068139',
    nombres: 'Jorge Luis',
    apellidos: 'Garcia Hernandez',
    telefono: '456789123',
    email: 'jorgeluis@gmail.com',
    genero: 'Masculino'
  },
  {
    id: 4,
    documento: '77068139',
    nombres: 'Maria Isabel',
    apellidos: 'Sanchez Flores',
    telefono: '654321987',
    email: 'mariaisabel@gmail.com',
    genero: 'Femenino'
  },
  {
    id: 5,
    documento: '77068139',
    nombres: 'Fernando',
    apellidos: 'Torres Fernandez',
    telefono: '111222333',
    email: 'fernando@gmail.com',
    genero: 'Masculino'
  },
  {
    id: 6,
    documento: '97068139',
    nombres: 'Carolina',
    apellidos: 'Gomez Ramirez',
    telefono: '444555666',
    email: 'carolina@gmail.com',
    genero: 'Femenino'
  },
  {
    id: 7,
    documento: '77068139',
    nombres: 'Pedro',
    apellidos: 'Garcia Gonzalez',
    telefono: '777888999',
    email: 'pedro@gmail.com',
    genero: 'Masculino'
  },
  {
    id: 8,
    documento: '87068139',
    nombres: 'Laura',
    apellidos: 'Fernandez Garcia',
    telefono: '333444555',
    email: 'laura@gmail.com',
    genero: 'Femenino'
  },
  {
    id: 9,
    documento: '577068139',
    nombres: 'Hector',
    apellidos: 'Lopez Perez',
    telefono: '555666777',
    email: 'hector@gmail.com',
    genero: 'Masculino'
  },
  {
    id: 10,
    documento: '27068139',
    nombres: 'Rosa Maria',
    apellidos: 'Hernandez Perez',
    telefono: '888999000',
    email: 'rosamaria@gmail.com',
    genero: 'Femenino'
  }
]
