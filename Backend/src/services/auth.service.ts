import * as randomstring from 'randomstring';
import CodigoTemporal from "../models/CodigoTemporalModel";
import { Respuesta } from "../models/Respuesta";
import Rol from "../models/RolModel";
import Usuario from "../models/UsuarioModel";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import logger from "../utils/logger";
import { Mapper } from "../utils/Mappers";
import { CodigoTemporalService } from "./codigoTemporal.service";
import { NotificacionService } from "./notificacion.service";
import fs from 'fs';
import path from 'path';
import * as Mustache from 'mustache';
import { IMensajeToCorreo, IRespuesta, IUsuario } from 'types-prestamista';
import { IAuth, IAuthRest } from 'types-prestamista/dist/interfaces/usuario.interface';

export class AuthService {
  
  mapper: Mapper;
  codigoService: CodigoTemporalService;
  notificacionService: NotificacionService;

  constructor() {
    this.mapper = new Mapper();
    this.codigoService = new CodigoTemporalService();
    this.notificacionService = new NotificacionService();
  }

  registrarUsuario = async (data: IUsuario): Promise<IRespuesta<IAuthRest>> => {

    const respuesta = new Respuesta<IAuthRest>();

    try {
      const checkIs = await Usuario.findOne({ correo: data.correo });
      if (checkIs) return { ...respuesta, mensaje: "CORREO YA REGISTRADO" };
      if (!data.roles) return { ...respuesta, mensaje: "INDICA UN ROL VÁLIDO" };

      const password = await encrypt(data.password);

      // convertir reles
      const rolesBaseDatos = await Rol.find();

      const roles: Array<String> = data.roles.map((r) => {
        let findRol = rolesBaseDatos.find((rol) => rol.nombre === r.nombre);
        if (!findRol) return "";
        return findRol.id;
      });

      const usuario = await Usuario.create({...data,password,roles});

      if (!usuario)
      return {...respuesta,mensaje: "ERROR: HAY DATOS INCORRECTOS"};

      const token = generateToken(usuario.id);

      return { ok: true, code: 200, mensaje: "REGISTRO EXITOSO", data: { token, usuario }};

    } catch (error: any) {
      logger.info("REGISTRAR USUARIO SERVICE ERROR: " + error.message);
    }
    return { ...respuesta, code: 500, mensaje: "ERROR EN REGISTRAR_USUARIO SERVICE" };
  };

  registrarConEmail = async ({
    nombreUsuario,
    password,
    codigo
  }: IAuth): Promise<IRespuesta<IAuthRest>> => {
  
    const respuesta = new Respuesta<IAuthRest>()

    try {
      const existeCodigo = await CodigoTemporal.findOne({codigo});

      if(!existeCodigo) return {...respuesta, mensaje: 'CÓDIGO INVALIDO'}

      const existeUsuario = await Usuario.findOne({ nombreUsuario });
      if (existeUsuario) return { ...respuesta, mensaje: "USUARIO YA EXISTE" };

      // const nuevoUsuario = this.mapper.fromDataEmailToUsuario({nombreUsuario,password,codigo});
      // return this.registrarUsuario(nuevoUsuario);
      
    } catch (error: any) {
      logger.info("REGISTRAR CON MOVIL SERVICE ERROR: " + error.message);
    }

    return {...respuesta, mensaje: 'ERROR AL REGISTRARSE CON NÚMERO MOVÍL'};
  };


  loginUsuario = async ({
    nombreUsuario,
    password,
  }: IAuth): Promise<IRespuesta<IAuthRest>> => {
   
    const respuesta = new Respuesta<IAuthRest>();

    try {
      const usuario = await Usuario.findOne({ nombreUsuario });

      if (!usuario) return { ...respuesta, mensaje: "USUARIO NO ENCONTRADO" };

      const passwordHash = usuario.password;
      const isCorrect = await verified(password, passwordHash);

      if (!isCorrect) return { ...respuesta, mensaje: "PASSWORD INCORRECTO" };

      const token = generateToken(usuario.id);

      return {
        ok: true,
        code: 200,
        mensaje: "DATOS VÁLIDOS",
        data: { token, usuario },
      };
    } catch (error) {
      logger.info("AUTH SERVICE ERROR: " + error);
    }
    return { ...respuesta, code: 500, mensaje: "ERROR EN LOGIN_USUARIO SERVICE" };
  };

  reLogin = async (id: string): Promise<IRespuesta<IAuthRest>> => {
    console.log(id)
    const respuesta = new Respuesta<IAuthRest>();

    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) return { ...respuesta, mensaje: "USUARIO NO ENCONTRADO" };

      const token = generateToken(usuario.id);

      return {
        ok: true,
        code: 200,
        mensaje: "TOKEN VALIDADO",
        data: { token, usuario },
      };
    } catch (error) {
      logger.info("RE AUTH SERVICE ERROR: " + error);
    }

    return { ...respuesta, code: 500, mensaje: "ERROR EN RE_LOGIN SERVICE" };
  };

  verificarExisteMovil = async (celular:string): Promise<IRespuesta<boolean>> => {
    
    const respuesta = new Respuesta<boolean>()

    try {
      const existeUsuario = await Usuario.findOne({celular});
      
      if(existeUsuario) return  {...respuesta, mensaje:'NÚMERO YA REGISTRADO'};
  
      const codigoGenerado = randomstring.generate({
        length: 4,
        charset: 'alphabetic',
        capitalization: 'uppercase',
        readable: true
      });
  
      const codigoBD = await this.codigoService.registrarCodigoTemporal({codigo: codigoGenerado, tipo: 'MOVIL'});
      if(!codigoBD.codigo) return {...respuesta, mensaje:'NO SE REGISTRÓ EL CÓDIGO'};
  
      const notificacion = await this.notificacionService.enviarNotificacionMovil({
        celular: celular,
        mensaje: `Hola desde la app yola, valida tu cuenta con este código: ${codigoBD.codigo}`
      });
      

      if(!notificacion) return {...respuesta, mensaje:'NO SE ENVIÓ LA CÓDIGO'};

      return {
        ok: true,
        code: 200,
        mensaje: `SE ENVÍO LA NOTIFICACIÓN AL NÚMERO MOVIL: ${celular}`,
        data: true,
      };
      
    } catch (error) {
      logger.info("AUTH SERVICE ERROR, VERIFICAR MOVIL: " + error);
    }
    
    return {...respuesta, code:500, mensaje: 'ERROR EN VERIFICAR_MOVIL SERVICE'}

  }

  verificarExisteCorreo = async (correo:string): Promise<IRespuesta<boolean>> => {
    console.log(correo);
    
    const respuesta = new Respuesta<boolean>()

    if(!correo) return  {...respuesta, mensaje:'CORREO NO INDICADO'};

    try {
      const existeUsuario = await Usuario.findOne({correo});
      
      if(existeUsuario) return  {...respuesta, mensaje:'CORREO YA REGISTRADO'};
  
      const codigoGenerado = randomstring.generate({
        length: 4,
        charset: 'alphabetic',
        capitalization: 'uppercase',
        readable: true
      });
  
      const codigoBD = await this.codigoService.registrarCodigoTemporal({codigo: codigoGenerado, tipo: 'EMAIL'});
      if(!codigoBD.codigo) return {...respuesta, mensaje:'NO SE REGISTRÓ EL CÓDIGO'};
  
      const direccion = path.join(__dirname, '../public/Templates/registro_email.html');
      
      const htmlContent = await fs.readFileSync(direccion, 'utf8');
      const data = {
        codigo: codigoBD.codigo,
      };
      const renderedHtml = Mustache.render(htmlContent, data);

      const mensajeCorreo: IMensajeToCorreo = {
        from: 'yelsino321@gmail.com',
        to: correo,
        subject: 'Código de verificación',
        html: renderedHtml
      }

      const notificacion = await this.notificacionService.enviarNotificacionCorreo(mensajeCorreo);
      
      if(!notificacion) return {...respuesta, mensaje:'NO SE ENVIÓ LA NOTIFICACION DE CORREO'};

      return {
        ok: true,
        code: 200,
        mensaje: `SE ENVÍO LA NOTIFICACIÓN AL CORREO: ${correo}`,
        data: true,
      };
      
    } catch (error) {
      logger.info("AUTH SERVICE ERROR, VERIFICAR MOVIL: " + error);
    }
    
    return {...respuesta, code:500, mensaje: 'ERROR EN VERIFICAR_EMAIL SERVICE'}

  }

  

  usuarioConectado = async (id: string) => {
    try {
      const usuario = await Usuario.findById(id);
      if(!usuario) return false;

      usuario.online = true
  
      await usuario.save()
      return usuario
    } catch (error) {
      console.log(error)
    }
  }

  usuarioDesconectado = async (id: string) => {
    try {
      const usuario = await Usuario.findById(id);
      if(!usuario) return false;
      
      usuario.online = false
  
      await usuario.save()
      return usuario
    } catch (error) {
      console.log(error)
    }
  }

  obtenerUsuarios = async ():Promise<IRespuesta<IUsuario[]>> => {
    const respuesta = new Respuesta<IUsuario[]>();

    try {
      const usuarios = await Usuario.find();
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

  restaurarCuentaOperario = async (documento:string): Promise<IRespuesta<IAuthRest>> => {
    const respuesta = new Respuesta<IAuthRest>();
    try {

   
      const operario = await Usuario.findOne({documento});
      if(!operario) return {...respuesta, mensaje: 'OPERARIO NO ENCONTRADO'}

      const password = await encrypt(documento);
      const token = generateToken(operario.id);

      operario.password = password;

      await operario.save();

      return {
        ok: true,
        code: 200,
        mensaje: 'CUENTA OPERARIO RESTAURADA',
        data: {
          token,
          usuario: operario
        }
      }
      
    } catch (error:any) {
      logger.error("RESTAURAR CUENTA OPERARIO SERVICE ERROR: " + error.message);
    }

    return {...respuesta, mensaje: 'ERROR AL RESTAURAR CUENTA OPERARIO', code: 500}

  }

}
