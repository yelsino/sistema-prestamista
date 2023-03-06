import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'


type SocketEmit = 
    | 'get-user-orders'

type SocketOn = 
    | 'disconnect'
    | 'connect'
    | 'USER_ACTIONS'
    | 'GET_ALL_PRODUCTS'
    | 'GET_USER_LISTS'
    | 'GET_USER_ORDERS'
    | 'GET_USER_DIRECTIONS'
    | 'RETORN_LIST_SELECTED'

export interface SocketProps {
  on: (action: SocketOn, callback: (data: any) => void) => void
  emit?: (action: SocketEmit, data: object) => void
  disconnect: () => void
  connected: boolean
}

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<SocketProps>()
  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('token')

    const socketTemp: SocketProps = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token
      }
    })

    setSocket(socketTemp)
  }, [serverPath])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    if (socket) {
      setOnline(socket?.connected)
    }
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }
}
