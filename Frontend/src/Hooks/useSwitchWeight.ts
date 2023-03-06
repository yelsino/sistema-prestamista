import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { formatToMoney } from 'helpers/formatToMoney'
import { useContext, useEffect, useState } from 'react'
import { Cantidad, IProducto, ItemLista } from 'types-yola'

interface Props {
  producto: IProducto
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
}

interface DataEventList {
  listaId: string;
  productoId: string;
  cantidad: Cantidad;
}

export const useSwitchWeight = ({ producto, setAdding }: Props) => {
  const { _id } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { list: listaSeleccionada } = useContext(ListContext)
  const { setNotificacion } = useContext(NotificacionContext)

  // cual de los productos seleccionado hay en lista?
  const [itemLista, setItemLista] = useState<ItemLista>()
  // cual de las medidas esta seleccionada?
  const [pesoSeleccionado, seleccionarPeso] = useState('')
  // cual es el precio de la medida seleccionada?
  const [precioSeleccionado, seleccionarPrecio] = useState(0)
  // cuanto de la meda seleccionada hay en lista?
  const [cantidadEnLista, setCantidadEnLista] = useState(0);
  // cuanto es el total a pagar por este producto?            
  const [montoTotalDelProducto, setMontoTotalDelProducto] = useState(0)
  // cuanto tienes en lista de este producto?
  const [cantidadTotalDelProducto, setCantidadTotalDelProducto] = useState(0)

  const addProductToList = () => {
    setAdding(true)
    socket?.emit('UPDATE_USER_LIST', {
      evento: 'ADD_PRODUCT_TO_LIST',
      data: {
        listaId: listaSeleccionada._id,
        productoId: producto._id,
        cantidad: producto.precios.find((precio) => precio._id === pesoSeleccionado),
      }
    })
  }

  const removeProductOfList = () => {
    socket?.emit('UPDATE_USER_LIST', {
      evento: 'REMOVE_PRODUCT_OF_LIST',
      data: {
        listaId: listaSeleccionada._id,
        productoId: producto._id,
        cantidad: null,
      }
    })
    setNotificacion({ message: `Quitó ${producto.nombre} de lista`, type: 1 })
  }

  // item de lista seleccionado
  useEffect(() => {
    const itemLista = listaSeleccionada.itemsLista.find((item) => item.producto._id === producto._id);
    if (itemLista) {
      setItemLista(itemLista)
    }
  }, [pesoSeleccionado])

  // ¿cual de las medidas esta seleccionada?
  useEffect(() => {
    const position = JSON.parse(localStorage.getItem("position")) ? Number(JSON.parse(localStorage.getItem("position"))) : 0
    seleccionarPeso(producto.precios[position]._id)
  }, [producto])

  // ¿cual es el precio de la medida seleccionada?
  useEffect(() => {
    if (pesoSeleccionado) {
      const mount = producto.precios.find((precio) => precio._id === pesoSeleccionado)
      if (mount) {
        seleccionarPrecio(mount.precio)
      }
    }
  }, [pesoSeleccionado])


  // ¿de la medida seleccionada cuanto en total hay en lista?
  useEffect(() => {
      if(pesoSeleccionado){
        const itemLista = listaSeleccionada.itemsLista.find((item) => item.producto._id === producto._id);
        
        if(!itemLista) return setCantidadEnLista(0)

        const cantidadSeleccionada = itemLista.cantidades.find((cantidad) => cantidad._id === pesoSeleccionado)
        
        setCantidadEnLista(cantidadSeleccionada ? cantidadSeleccionada.cantidad : 0)
      }
  }, [pesoSeleccionado, listaSeleccionada])

  // ¿Cual es el total a pagar por este producto?
  useEffect(()=> {
    if(pesoSeleccionado){
      const itemLista = listaSeleccionada.itemsLista.find((item) => item.producto._id === producto._id);
      
      if(!itemLista) {
        setMontoTotalDelProducto(0);
        setCantidadTotalDelProducto(0);
        return 
      }

      setMontoTotalDelProducto(itemLista.montoTotal)
      setCantidadTotalDelProducto(itemLista.cantidadTotal)
    }
      
  }, [ pesoSeleccionado,listaSeleccionada])

  return {
    pesoSeleccionado,
    seleccionarPeso,
    precioSeleccionado,
    cantidadEnLista,
    montoTotalDelProducto,
    cantidadTotalDelProducto,
    removeProductOfList,
    addProductToList,
    itemLista
  } as const
}
