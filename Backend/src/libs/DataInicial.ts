import Rol from "../models/RolModel";
import Usuario from "../models/UsuarioModel";
import { encrypt } from "../utils";
import { usuariosTienda } from "./usuariosTienda";

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
    await crearUsuarios()
  ])
}