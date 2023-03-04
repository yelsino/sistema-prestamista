import { IDepartamento, IDireccion, IDistrito, IProvincia, IRespuesta } from "types-prestamista";
import Departamento from "../models/DepartamentoModel";
import Direccion from "../models/DireccionModel";
import Distrito from "../models/DistritoModel";
import Provincia from "../models/ProvinciaModel";
import { Respuesta } from "../models/Respuesta";
import Usuario from "../models/UsuarioModel";
import logger from "../utils/logger";

export class DireccionService{

    constructor(){

    }

    registrarDireccion = async (data:IDireccion): Promise<IRespuesta<IDireccion>> => {
      
        const respuesta = new Respuesta();

        try {
            
            const usuario = await Usuario.findById(String(data.cliente));
            if(!usuario) return {...respuesta, code: 404, ok: false, data: null, mensaje: "NO SE ENCONTRO AL CLIENTE"};
            
            const nuevaDireccion =  await  Direccion.create(data);
            return  {...respuesta, code: 200, ok: true, data: nuevaDireccion, mensaje: "DIRECCION REGISTRADA"};
            
        } catch (error: any) {
            logger.info("ERROR AL REGISTRAR DIRECCION" + error.message)
        }
       
        return {...respuesta, code: 500, ok: false, data: null};

    };

    obtenerDireccionesUsuario = async (usuario:String):Promise<IRespuesta<IDireccion[]>> => {
        const respuesta = new Respuesta();

        try {
            
            const direcciones = await Direccion.find({usuario});
            return  {...respuesta, code: 200, ok: true, data: direcciones, mensaje: "DIRECCIONES OBTENIDAS"};

        } catch (error: any) {
            logger.info("ERROR AL OBTENER DIRECCIONES" + error.message)
        }
        return {...respuesta, code: 500, ok: false, data: null};
    };

    obtenerDepartamentos = async ():Promise<IRespuesta<IDepartamento[]>> => {
        const respuesta = new Respuesta();

        try {
            
            const departamentos = await Departamento.find();
            return  {...respuesta, code: 200, ok: true, data: departamentos, mensaje: "DEPARTAMENTOS OBTENIDOS"};

        } catch (error: any) {
            logger.info("ERROR AL OBTENER DEPARTAMENTOS" + error.message)
        }
        return {...respuesta, code: 500, ok: false, data: null};
    };

    obtenerProvincias = async (departamento:String):Promise<IRespuesta<IProvincia[]>> => {
        const respuesta = new Respuesta();

        try {
            
            const provincias = await Provincia.find({departamento}).lean();
            return  {...respuesta, code: 200, ok: true, data: provincias, mensaje: "PROVINCIAS OBTENIDAS"};

        } catch (error: any) {
            logger.info("ERROR AL OBTENER PROVINCIAS" + error.message)
        }
        return {...respuesta, code: 500, ok: false, data: null};
    }

    obtenerDistritos = async (provincia:String):Promise<IRespuesta<IDistrito[]>> => {
        const respuesta = new Respuesta();

        try {
            const distritos = await Distrito.find({provincia}).lean();
            return  {...respuesta, code: 200, ok: true, data: distritos, mensaje: "DISTRITOS OBTENIDOS"};

        } catch (error: any) {
            logger.info("ERROR AL OBTENER DISTRITOS" + error.message)
        }
        return {...respuesta, code: 500, ok: false, data: null};
    }

}