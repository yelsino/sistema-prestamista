import Departamento from "../models/DepartamentoModel";
import Distrito from "../models/DistritoModel";
import Provincia from "../models/ProvinciaModel";
import Rol from "../models/RolModel";
import Usuario from "../models/UsuarioModel";
import { encrypt } from "../utils";
import { departamentos, distritos, provincias } from "./dataDirecciones";
import { usuariosTienda } from "./usuariosTienda";

export const crearDirecciones = async () => {
  try {
    const numDepartamentos = await Departamento.estimatedDocumentCount();
    const numProvincias = await Provincia.estimatedDocumentCount();
    const numDistritos = await Distrito.estimatedDocumentCount();

    if(numDepartamentos > 0 && numProvincias > 0 && numDistritos > 0) return;

    const departamentosGenerados = departamentos.map(async (v) => {
      const nuevo = new Departamento({nombre: v.nombre, codigo: v.id});
      return  Departamento.create(nuevo);
    });
    
    const departamentosDB = await Promise.all(departamentosGenerados);

    const provinciasGeneradas = provincias.map(async (v) => {
      const nuevo = new Provincia({nombre: v.nombre, codigo: v.id, departamento: departamentosDB.find(d => d.codigo === v.id)?._id});
      return  Provincia.create(nuevo);
    });

    const provinciasDB = await Promise.all(provinciasGeneradas);

    const distritosGenerados = distritos.map(async (v) => {
      const nuevo = new Distrito({nombre: v.nombre, codigo: v.id, provincia: provinciasDB.find(p => p.codigo === v.id)?._id});
      return  Distrito.create(nuevo);
    });

    await Promise.all(distritosGenerados);

    console.log('Data para direcciones creada')
  } catch (error) {
    console.log(error);
  }
}

export const crearRoles = async () => {
  try {
    const cantidad = await Rol.estimatedDocumentCount();
    if(cantidad > 0) return

    await Promise.all([
      new Rol({nombre: 'USUARIO'}).save(),
      new Rol({nombre: 'CASERO'}).save(),
      new Rol({nombre: 'TRABAJADOR'}).save(),
      new Rol({nombre: 'ADMIN'}).save(),
    ])
    console.log('Roles creados');
    
  } catch (error) {
    console.log(error);
  }
}


export const crearUsuarios = async () => {
  try {
    const cantidad = await Usuario.estimatedDocumentCount();
    if(cantidad > 0) return;

    const roles = await Rol.find()

    
    const usuarios = usuariosTienda.map(async (u) => {
      const password = await encrypt(u.password);
      const rolesId:Array<String> = u.roles.map((r:any) => {
        let findRol = roles.find(rol => rol.nombre === r.nombre);
        if(!findRol) return ''
        return findRol.id
      });
      
      const usuario = new Usuario({...u, roles:rolesId,password});

      return  Usuario.create(usuario);
     
    });

    await Promise.all(usuarios);
    console.log('usuarios creados');
    

  } catch (error) {
    console.log(error);
    
  }
}

export const generarData = async () => {
  Promise.all([
    await crearRoles(),
    await crearUsuarios(),
    await crearDirecciones()
  ])
}