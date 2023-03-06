import { useEffect, useState } from 'react'

export const useOnClick = (time = 0) => {
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisabled(false)
      // solo se renderiza 1 vez
    }, time)

    return () => clearTimeout(timeout)
  }, [disabled])

  return [disabled, setDisabled] as const
}
