import Cliente from "../models/ClienteModel";
import Cuota from "../models/CuotaModel";
import Departamento from "../models/DepartamentoModel";
import Direccion from "../models/DireccionModel";
import Distrito from "../models/DistritoModel";
import Moneda from "../models/MonedaModel";
import Prestamo from "../models/PrestamoModel";
import Provincia from "../models/ProvinciaModel";
import Rol from "../models/RolModel";
import Usuario from "../models/UsuarioModel";
import { encrypt } from "../utils";
import logger from "../utils/logger";
import { clientes } from "./dataClientes";
import { cuotas } from "./dataCuotas";
import { departamentos, direcciones, distritos, provincias } from "./dataDirecciones";
import { monedas } from "./dataMonedas";
import { prestamos } from "./dataPrestamos";
import { usuarios } from "./dataUsuarios";

export const crearRoles = async () => {
  try {
    const cantidad = await Rol.estimatedDocumentCount();
    if(cantidad > 0) return

    await Promise.all([
      new Rol({nombre: 'ADMIN'}).save(),
      new Rol({nombre: 'AGENTE'}).save(),
    ])
    console.log('Roles creados');
    
  } catch (error) {
    console.log(error);
  }
}

export const crearDirecciones = async () => {
  try {
    const numDepartamentos = await Departamento.estimatedDocumentCount();
    const numProvincias = await Provincia.estimatedDocumentCount();
    const numDistritos = await Distrito.estimatedDocumentCount();

    if(numDepartamentos > 0 && numProvincias > 0 && numDistritos > 0) return;

    const departamentosGenerados = departamentos.map(async (v) => {
      const nuevo = new Departamento({nombre: v.nombre, codigo: v.uuid});
      return  Departamento.create(nuevo);
    });
    
    const departamentosDB = await Promise.all(departamentosGenerados);

    const provinciasGeneradas = provincias.map(async (v) => {
      const nuevo = new Provincia({
        nombre: v.nombre, 
        codigo: v.departamento, 
        departamento: departamentosDB.find(d => d.codigo === v.departamento)?._id,
        uuid: v.uuid
      });
      return  Provincia.create(nuevo);
    });

    const provinciasDB = await Promise.all(provinciasGeneradas);

    const distritosGenerados = distritos.map(async (v) => {
      const nuevo = new Distrito({
        nombre: v.nombre, 
        codigo: v.provincia, 
        provincia: provinciasDB.find(p => p.uuid === v.provincia)?._id,
        uuid: v.uuid
      });
      return  Distrito.create(nuevo);
    });

    await Promise.all(distritosGenerados);

    console.log('Data para direcciones creada')
  } catch (error) {
    console.log(error);
  }
}

export const crearDireccionesClientes = async () => {
  try {
    const departamento = await Departamento.findOne({codigo:12});
    const provincia = await Provincia.findOne({codigo:14});
    const distritos = await Distrito.find({codigo:14});
    const clientes = await Cliente.find();

    const direccionesGeneradas = direcciones.map(async (d) => {
      
      const nuevo = new Direccion({
        ...d,
        departamento: departamento?._id,
        provincia: provincia?._id,
        distrito: distritos[Math.floor(Math.random() * distritos.length)]._id,
        cliente: clientes[Math.floor(Math.random() * clientes.length)]._id,
      })
      return Direccion.create(nuevo);
    });

    await Promise.all(direccionesGeneradas);
   

    console.log('Direcciones clientes creadas')
  } catch (error) {
    console.log(error);
  }
}

export const crearUsuarios = async () => {
  try {
    const cantidad = await Usuario.estimatedDocumentCount();
    if(cantidad > 0) return;

    const roles = await Rol.find()

    
    const usuariosGenerados = usuarios.map(async (u) => {
      const password = await encrypt(u.password);
      const rolesId:Array<String> = u.roles.map((r:any) => {
        let findRol = roles.find(rol => rol.nombre === r.nombre);
        if(!findRol) return ''
        return findRol.id
      });
      
      const usuario = new Usuario({...u, roles:rolesId,password});

      return  Usuario.create(usuario);
     
    });

    await Promise.all(usuariosGenerados);

    console.log('usuarios creados');
    

  } catch (error) {
    console.log(error);
    
  }
}

export const crearClientes = async () => {
  try {
    const cantidad = await Cliente.estimatedDocumentCount();
    if(cantidad > 0) return;

    const usuarios = await Usuario.find().lean()

    const clientesGenerados = clientes.map(async (u) => {
      const cliente = new Cliente({
        ...u,
        agente: usuarios[Math.floor(Math.random() * usuarios.length)]._id,
      });
      return  Cliente.create(cliente);
     
    });

    await Promise.all(clientesGenerados);

    console.log('clientes creados');

  } catch (error) {
    console.log(error);
    
  }
}

export const crearMonedas = async () => {
  try {
    const cantidad = await Moneda.estimatedDocumentCount();
    if(cantidad > 0) return;

    const monedasGeneradas = monedas.map(async (m) => {
      const nuevo = new Moneda({...m});
      return  Moneda.create(nuevo);
    });

    await Promise.all(monedasGeneradas);

    console.log('Monedas creadas');

  } catch (error) {
    console.log(error);
    
  }
}

export const crearPrestamos = async () => {
  try {
    const cantidad = await Prestamo.estimatedDocumentCount();
    if(cantidad > 0) return;

    const usuarios = await Usuario.find();
    const clientes = await Cliente.find();
    const monedas = await Moneda.find();

    const prestamosGenerados = prestamos.map(async (p) => {
      const nuevo = new Prestamo({
        ...p,
        cliente: clientes[Math.floor(Math.random() * clientes.length)]._id,
        agente: usuarios[Math.floor(Math.random() * usuarios.length)]._id,
        moneda: monedas[Math.floor(Math.random() * monedas.length)]._id,
      });

      // generar cuotas de prestamos
      return  Prestamo.create(nuevo);
    });

    const prestamosBD = await Promise.all(prestamosGenerados);

    const cuotasGeneradas = cuotas.map(async (p) => {
      const nuevo = new Cuota({
        ...p,
        prestamo: prestamosBD[Math.floor(Math.random() * prestamos.length)]._id,
        cliente: clientes[Math.floor(Math.random() * clientes.length)]._id,
        agente: usuarios[Math.floor(Math.random() * usuarios.length)]._id,
      });

      return  Cuota.create(nuevo);
    });

    await Promise.all(cuotasGeneradas);
    console.log('Prestamos creados');
    
  } catch (error) {
    console.log(error);
  }
}

export const generarData = async () => {
  Promise.all([
    await crearRoles(),
    await crearUsuarios(),
    await crearDirecciones(),
    await crearClientes(),
    await crearDireccionesClientes(),
    await crearMonedas(),
    await crearPrestamos(),
  ])
}