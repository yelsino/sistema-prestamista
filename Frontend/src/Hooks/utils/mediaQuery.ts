import { useMediaQuery } from './useMediaQuery'

export const useIsSmall = () => useMediaQuery('(min-width: 480px)')
export const useIsMedium = () => useMediaQuery('(min-width: 768px)')
export const useIsLarge = () => useMediaQuery('(min-width: 1024px)')
