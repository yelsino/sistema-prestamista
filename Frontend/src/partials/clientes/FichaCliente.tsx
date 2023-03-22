import React from 'react'
import { IClienteDetalle } from 'types-prestamista'

interface Props {
    cliente: IClienteDetalle;
}

export class FichaCliente extends React.PureComponent<Props> {
  render () {
    const { cliente } = this.props
    return (
            <>
                {cliente && (
                    <div className="p-20 bg-white flex flex-col gap-y-3">
                        <h1 className="text-2xl border-b-4 border-black p-2">
                            Ficha Cliente
                        </h1>
                        <div className=" ">
                            <p className="capitalize">
                                Nombres: {cliente?.nombres} {cliente?.apellidos}
                            </p>
                            <p>Documento: {cliente?.documento}</p>
                            <p className='flex gap-x-1'>
                                Genero:
                                <div className="first-letter:uppercase">{' '}{ cliente?.genero}</div>
                            </p>
                        </div>
                        <div className="">
                            <h2 className="bg-gray-300 font-bold">
                                Dirección de contacto
                            </h2>
                            <p>
                                Departamento:{' '}
                                {cliente?.direccion?.departamento?.nombre}
                            </p>
                            <p>
                                Provincia:{' '}
                                {cliente?.direccion?.provincia?.nombre}
                            </p>
                            <p>
                                Distrito: {cliente?.direccion?.distrito?.nombre}
                            </p>
                            <p className='flex gap-x-1'>
                                Direccion:{' '}
                                <div className="first-letter:uppercase">
                                    {cliente?.direccion?.nombre}
                                </div>
                            </p>
                            <p className='flex gap-x-1'>
                                Referencia:{' '}
                                <div className="first-letter:uppercase">
                                    {cliente?.direccion?.referencia}
                                </div>{' '}
                            </p>
                        </div>
                        <div className="">
                            <p className="bg-gray-300 font-bold">
                                Datos contacto
                            </p>
                            <p>Celular: {cliente.celular}</p>
                            <p>Telefono: {cliente.telefono}</p>
                            <p>Correo: {cliente.correo}</p>
                        </div>
                        <div className="">
                            <p className="bg-gray-300 font-bold">
                                Datos de empresa
                            </p>
                            <p>Nombre de empresa: {cliente.empresa}</p>
                            <p>Razon Social: {cliente.razonSocial}</p>
                            <p>Ruc: {cliente.ruc}</p>
                        </div>
                    </div>

                )}
            </>
    )
  }
}
