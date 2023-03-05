import mongoose from "mongoose";
import { IRespuesta, IRol, IUsuario } from "types-prestamista";
import { Respuesta } from "../models/Respuesta";
import Rol from "../models/RolModel";
import Usuario from "../models/UsuarioModel";
import logger from "../utils/logger";


type PartialUsuario = Partial<IUsuario>;

interface UserParams extends PartialUsuario {} 

export class UsuarioService {
	
	filtrarUsuarios = async (userParams:UserParams):Promise<IRespuesta<IUsuario[]>> => {

		const respuesta = new Respuesta<IUsuario[]>();

		const roles = userParams.roles || [];

		try {
		  const usuarios = await Usuario.aggregate([
			{
				$lookup: {
				  from: 'roles',
				  localField: 'roles',
				  foreignField: '_id',
				  as: 'rolesData'
				}
			  },
			  {
				$unwind: '$rolesData'
			  },
			  {
				$match: {
				  'rolesData._id': { $in: roles.map((id:any) => new mongoose.Types.ObjectId(id)) }
				}
			  },
			  {
				$group: {
				  _id: '$_id',
				  nombres: { $first: '$nombres' },
				  apellidos: { $first: '$apellidos' },
				  sobreNombre: { $first: '$sobreNombre' },
				  celular: { $first: '$celular' },
				  online: { $first: '$online' },
				  roles: { $push: '$rolesData._id' },
				  foto: { $first: '$foto' },
				  documento: { $first: '$documento' },
				  idExterno: { $first: '$idExterno' },
				  estado: { $first: '$estado' },
				}
			  },
		  ])

		  if(!usuarios) return {...respuesta, mensaje: 'NO SE ENCONTRARON USUARIOS'}
	
		  return {
			ok: true,
			code: 200,
			mensaje: 'USUARIOS OBTENIDOS',
			data: usuarios
		  }    
		} catch (error: any) {
		   logger.info("OBTENER USUARIOS SERVICE ERROR: " + error.message);
		}
	
		return {...respuesta, mensaje: 'ERROR AL OBTENER USUARIOS', code: 500}
	}

	obtenerRoles = async ():Promise<IRespuesta<IRol[]>> => {
		const respuesta = new Respuesta<IRol[]>();
		
		try {
			const resultado = await Rol.find().lean();
			
			return {
				ok: true,
				code: 200,
				mensaje: 'ROLES OBTENIDOS',
				data: resultado
			}
		} catch (error: any) {
			logger.error("ERROR EN OBTENER ROLES SERVICE: " + error.message);
			return {...respuesta, mensaje: 'ERROR AL OBTENER ROLES', code: 500}
		}
	}

	obtenerUsuario = async (id: string):Promise<IRespuesta<IUsuario>> => {
		const respuesta = new Respuesta<IUsuario>();
	
		try {
		  const usuario = await Usuario.findById(id);
		  if(!usuario) return {...respuesta, mensaje: 'USUARIO NO ENCONTRADO'}
	
		  return {
			ok: true,
			code: 200,
			mensaje: 'USUARIO OBTENIDO',
			data: usuario
		  }    
		} catch (error: any) {
		   logger.info("OBTENER USUARIO SERVICE ERROR: " + error.message);
		}
	
		return {...respuesta, mensaje: 'ERROR AL OBTENER USUARIO', code: 500}
	}

	obtenerUsuarios = async ():Promise<IRespuesta<IUsuario[]>> => {
		const respuesta = new Respuesta<IUsuario[]>();
	
		try {
		  const usuarios = await Usuario.find();
		  if(!usuarios) return {...respuesta, mensaje: 'USUARIOS NO ENCONTRADOS'}
	
		  return {
			ok: true,
			code: 200,
			mensaje: 'USUARIOS OBTENIDOS',
			data: usuarios
		  }    
		} catch (error: any) {
		   logger.info("OBTENER USUARIOS SERVICE ERROR: " + error.message);
		   return {...respuesta, mensaje: 'ERROR AL OBTENER USUARIOS', code: 500}
		}
	
	}

	crearUsuario = async (usuario: IUsuario):Promise<IRespuesta<IUsuario>> => {
		const respuesta = new Respuesta<IUsuario>();
	
		try {
		  const nuevoUsuario = await Usuario.create(usuario);
		  if(!nuevoUsuario) return {...respuesta, mensaje: 'ERROR AL CREAR USUARIO'}
	
		  return {
			ok: true,
			code: 200,
			mensaje: 'USUARIO CREADO',
			data: nuevoUsuario
		  }    
		} catch (error: any) {
		   logger.info("CREAR USUARIO SERVICE ERROR: " + error.message);
		   return {...respuesta, mensaje: 'ERROR AL CREAR USUARIO', code: 500}
		}
	}
}