export interface IRespuesta<T>  {
  ok: boolean
  mensaje?: string
  code: number
  data?: T | null
}