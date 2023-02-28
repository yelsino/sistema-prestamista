
export const departamentos = [
  { id: 1, nombre: 'Amazonas' },
  { id: 2, nombre: 'Ancash' }
]

const provincias = [
  { id: 1, nombre: 'Chachapoyas', departamento: 1 },
  { id: 2, nombre: 'Bagua', departamento: 1 }
]

const distritos = [
  { id: 1, nombre: 'Chachapoyas', provincia: 1 },
  { id: 2, nombre: 'Asunción', provincia: 1 }
]

console.log(departamentos, provincias, distritos)
