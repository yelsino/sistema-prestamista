import { useState } from 'react'

const Texto = ({ children, remitente }:any) => {
  const [texto, setTexto] = useState(false)

  return (
        <div>
            <h1>{remitente}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sit eligendi est. Eos, suscipit mollitia labore nam, ducimus vitae error possimus aliquid, ex ab reprehenderit! Itaque, quo. Ratione, nisi quod.</p>
            {texto && (
                    <p className='border p-4'>LISTO PARA ENVIAR</p>
            )}

            {children}
            <button
                onClick={() => setTexto(!texto)}
                className='bg-red-200'>ENVIAR</button>
        </div>
  )
}

export default Texto
