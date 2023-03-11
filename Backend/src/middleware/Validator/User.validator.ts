import { z } from 'zod'

const VALUES = ["USUARIO", "CASERO", "TRABAJADOR", "ADMIN"] as const;

export class UsuarioValidar {

    registro = () => z.object({
        body: z.object({
            nombres: z
                .string()
                .optional(),
            apellidos: z
                .string()
                .min(3,'Minimo 3 carácteres')
                .optional(),
            sobreNombre: z
                .string()
                .min(3,'Minimo 1 carácteres')
                .optional(),
            correo: z
                .string()
                .min(3)
                .email({message: "Formato inválido"}),
            password: z
                .string()
                .min(3, 'Minimo 3 carácteres'),
            celular: z
                .string()
                .max(9,'Digitos exedidos')
                .optional(),
            online: z
                .boolean()
                .optional(),
            fotos: z
                .string()
                .optional(),
            documento: z 
                .string()
                .optional(),
            roles: z
                .array(z.object({nombre:z.enum(VALUES)}))
                .min(1)
                .optional(),
            idExterno: z
                .string()
                .optional()
        })
    });

    registroOperario = () => z.object({
        body: z.object({
            nombres: z
                .string()
                .optional(),
                apellidos: z
                .string()
                .min(3,'Minimo 3 carácteres')
                .optional(),
            sobreNombre: z
                .string()
                .min(3,'Minimo 1 carácteres')
                .optional(),
            correo: z
                .string()
                .min(3)
                .email({message: "Formato inválido"}),
            password: z
                .string()
                .min(3, 'Minimo 3 carácteres'),
            celular: z
                .string()
                .max(9,'Digitos exedidos')
                .optional(),
            online: z
                .boolean()
                .optional(),
            fotos: z
                .string()
                .optional(),
            documento: z 
                .string()
                .optional(),
            roles: z
                .array(z.object({nombre:z.enum(VALUES)}))
                .min(1)
                .optional(),
            idExterno: z
                .string()
                .optional(),
            direccion: z
                .string()
                .optional(),
        })
    });

    registroConEmail = () => z.object({
        body: z.object({
            correo: z
                .string()
                .min(3)
                .email({message: "Formato inválido"}),
            password: z
                .string()
                .min(3, 'Minimo 3 carácteres'),
            codigo: z   
                .string()
        })
    });

    registroConMovil = () => z.object({
        body: z.object({
            celular: z
              .string()
              .max(9, 'Digitos exedidos')
              .optional(),
            password: z
              .string()
              .min(3,'Minimo 3 carácteres')
              .optional(),
            codigo: z
              .string()
              .min(3,'Minimo 2 carácteres')
              .optional(),
          })
    });

    login = () => z.object({
        body: z.object({
            nombreUsuario: z.string(),
            password: z.string()
        })
    });

    loginOperario = () => z.object({
        body: z.object({
            documento: z.string(),
            password: z.string()
        })
    });

    reLogin = () => z.object({
        body: z.object({

        })
    });

    loginGoogle = () => z.object({
        body: z.object({
            googleId: z.string(),
            profileObj: z.object({
                imageUrl: z.string(),
                email: z.string(),
                name: z.string(),
                givenName: z.string(),
                familyName: z.string(),
            }),
        })
    });

    loginFacebook = () => z.object({
        body: z.object({
            name: z.string(),
            email: z.string(),
            picture: z.object({}),
            id: z.string(),
            accessToken: z.string(),
            userID: z.string(),
            expiresIn: z.number(),
        })
    });

    loginConMovil = () => z.object({
        body: z.object({
            celular: z.string().max(9, 'Digitos exedidos'),
            password: z.string().min(3, 'Minimo 3 digitos'),
        })
    });

    verificarExisteMovil = () => z.object({
        body: z.object({
            celular: z.string().max(9,'Digitos exedidos')
        })
    });

    verificarExisteEmail = () => z.object({
        body: z.object({
            correo: z.string().email()
        })
    });
    
}