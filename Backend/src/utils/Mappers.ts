import * as randomstring from 'randomstring';
import { ItemLista, IAuth, IAuthFacebook, IAuthGoogle, IMobile, IProducto, IUsuario } from 'types-yola';
export class Mapper {
  
  fromDataGoogleToUsuario = (data: IAuthGoogle):IUsuario => {
    return {
      nombres: data.profileObj.name,
      apellidos: data.profileObj.familyName,
      correo: data.profileObj.email,
      password: data.googleId,
      sobreNombre: data.profileObj.givenName,
      celular: "",
      online: false,
      roles: [{ nombre: "USUARIO" }],
      foto: data.profileObj.imageUrl,
      documento: "",
      idExterno: data.googleId,
    };
  }

  fromDataFacebookToUsuario = (data: IAuthFacebook):IUsuario => {
    return {
      nombres: data.name,
      apellidos: data.userID,
      correo: data.email,
      password: data.userID,
      sobreNombre: "",
      celular: "",
      online: false,
      roles: [{ nombre: "USUARIO" }],
      foto: data.picture.data.url,
      documento: "",
      idExterno: data.userID,
    };
  }

  fromDataMobileToUsuario = (data: IMobile): IUsuario => {

    const codigo = randomstring.generate({
      length: 4,
      charset: 'alphabetic',
      capitalization: 'uppercase',
      readable: true
    });

    return {
      nombres: `Usuario #${codigo}`,
      apellidos: "",
      correo: data.celular,
      password: data.password,
      sobreNombre: "",
      celular: data.celular,
      online: false,
      roles: [{ nombre: "USUARIO" }],
      foto: "",
      documento: "",
      idExterno: "",
    };
  }

  fromDataEmailToUsuario = (data: IAuth): IUsuario => {

    const codigo = randomstring.generate({
      length: 4,
      charset: 'alphabetic',
      capitalization: 'uppercase',
      readable: true
    });

    return {
      nombres: `Usuario #${codigo}`,
      apellidos: "",
      correo: data.correo,
      password: data.password,
      sobreNombre: "",
      celular: "",
      online: false,
      roles: [{ nombre: "USUARIO" }],
      foto: "",
      documento: "",
      idExterno: "",
    };
  }

  convertirUnidadesMedida = (producto: IProducto):IProducto => {
    const { precios, tipoVenta } = producto;
    switch (tipoVenta) {
        case "UNIDADES":
            return {
                ...producto,
                precios: precios.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "chico";
                        v.textoPesoB = "pequeño";
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "medio";
                        v.textoPesoB = "mediano";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "grande";
                        v.textoPesoB = "el grande";
                        return v;
                    }
                    return v;
                }),
            };
        case "KILOGRAMOS":
            return {
                ...producto,
                precios: precios.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "1/4";
                        v.textoPesoB = `250 gramos`;
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "1/2";
                        v.textoPesoB = `500 gramos`;
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1 kg";
                        v.textoPesoB = `1 kilogramo`;
                        return v;
                    }
                    if (v.peso !== 250 && v.peso !== 500 && v.peso !== 1000) {
                        v.textoPesoA = `${v.peso} gr`;
                        v.textoPesoB = `${v.peso} gramos`;
                        return v;
                    }
                    return v;
                }),
            };
        case "LITROS":
            return {
                ...producto,
                precios: precios.map((v) => {
                    if (v.peso === 500) {
                        v.textoPesoA = "500 ml";
                        v.textoPesoB = "medio litro";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1 lt";
                        v.textoPesoB = "1 litro";
                        return v;
                    }

                    if (v.peso !== 500 && v.peso !== 1000) {
                        v.textoPesoA = `${v.peso} ml`;
                        v.textoPesoB = `${v.peso} mililitros`;
                        return v;
                    }
                    return v;
                }),
            };
        case "FRACCIONES":
            return {
                ...producto,
                precios: precios.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "1/4";
                        v.textoPesoB = "cuarta parte";
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "1/2";
                        v.textoPesoB = "la mitad";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1";
                        v.textoPesoB = "entero";
                        return v;
                    }
                    return v;
                }),
            };

        default:
            return producto;
    }
  };

  agregarMedidasAcantidad = (itemLista: ItemLista):ItemLista => {
    const { producto, cantidades } = itemLista;

    switch (producto.tipoVenta) {
        case "UNIDADES":
            return {
                ...itemLista,
                unidadMedida: "und",
                cantidades: cantidades.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "chico";
                        v.textoPesoB = "pequeño";
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "medio";
                        v.textoPesoB = "mediano";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "grande";
                        v.textoPesoB = "el grande";
                        return v;
                    }
                    return v;
                }),
            };
        case "KILOGRAMOS":
            return {
                ...itemLista,
                unidadMedida: "kg",
                cantidades: cantidades.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "1/4";
                        v.textoPesoB = `250 gramos`;
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "1/2";
                        v.textoPesoB = `500 gramos`;
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1 kg";
                        v.textoPesoB = `1 kilogramo`;
                        return v;
                    }
                    if (v.peso !== 250 && v.peso !== 500 && v.peso !== 1000) {
                        v.textoPesoA = `${v.peso} gr`;
                        v.textoPesoB = `${v.peso} gramos`;
                        return v;
                    }
                    return v;
                }),
            };
        case "LITROS":
            return {
                ...itemLista,
                unidadMedida: "lt",
                cantidades: cantidades.map((v) => {
                    if (v.peso === 500) {
                        v.textoPesoA = "500 ml";
                        v.textoPesoB = "medio litro";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1 lt";
                        v.textoPesoB = "1 litro";
                        return v;
                    }

                    if (v.peso !== 500 && v.peso !== 1000) {
                        v.textoPesoA = `${v.peso} ml`;
                        v.textoPesoB = `${v.peso} mililitros`;
                        return v;
                    }
                    return v;
                }),
            };
        case "FRACCIONES":
            return {
                ...itemLista,
                unidadMedida: "und",
                cantidades: cantidades.map((v) => {
                    if (v.peso === 250) {
                        v.textoPesoA = "1/4";
                        v.textoPesoB = "cuarta parte";
                        return v;
                    }
                    if (v.peso === 500) {
                        v.textoPesoA = "1/2";
                        v.textoPesoB = "la mitad";
                        return v;
                    }
                    if (v.peso === 1000) {
                        v.textoPesoA = "1";
                        v.textoPesoB = "entero";
                        return v;
                    }
                    return v;
                }),
            };

        default:
            return itemLista;
    }

   
  }

  convertirDataParaUsuario = (object: any): IUsuario => {
    return {
        nombres: object.nombres,
        apellidos: object.apellidos,
        correo: object.correo,
        password: object.password,
        sobreNombre: object.sobreNombre,
        celular: object.celular,
        online: object.online,
        roles: object.roles,
        foto: object.foto,
        documento: object.documento,
        idExterno: object.idExterno,
      };
  };

}

























//    transformWeight = () => {
//     const { pricePerWeight, typeOfsale } = product
//     // const { pricePerWeight, typeOfsale } = alterproduct;
//     switch (typeOfsale) {
//       case 'KILOGRAMOS':
//         return setAlterProduct({
//           ...alterproduct,
//           pricePerWeight: pricePerWeight.map((v) => {
//             if (v.weight === 250) {
//               v.weighttextmd = '1/4'
//               v.weighttextlg = `${v.weight} gramos`
//               return v
//             }
//             if (v.weight === 500) {
//               v.weighttextmd = '1/2'
//               v.weighttextlg = `${v.weight} gramos`
//               return v
//             }
//             if (v.weight === 1000) {
//               v.weighttextmd = '1 kg'
//               v.weighttextlg = `1 kilogramo`
//               return v
//             }
//             if (v.weight !== 250 || v.weight !== 500 || v.weight !== 1000) {
//               v.weighttextmd = `${v.weight} gr`
//               v.weighttextlg = `${v.weight} gramos`
//               return v
//             }
//             return v
//           })
//         })

//       case 'LITROS':
//         return setAlterProduct({
//           ...alterproduct,
//           pricePerWeight: pricePerWeight.map((v) => {
//             if (v.weight === 500) {
//               v.weighttextmd = '1/2'
//               v.weighttextlg = '1/2 litro'
//               return v
//             }
//             if (v.weight === 1000) {
//               v.weighttextmd = '1 lt'
//               v.weighttextlg = '1 litro'
//               return v
//             }

//             if (v.weight !== 500 || v.weight !== 1000) {
//               v.weighttextmd = `${v.weight} ml`
//               v.weighttextlg = `${v.weight} mililitros`
//               return v
//             }
//             return v
//           })
//         })

//       case 'FRACCIONES':
//         return setAlterProduct({
//           ...alterproduct,
//           pricePerWeight: pricePerWeight.map((v) => {
//             if (v.weight === 250) {
//               v.weighttextmd = '1/4'
//               v.weighttextlg = 'un cuarto'
//               return v
//             }
//             if (v.weight === 500) {
//               v.weighttextmd = '1/2'
//               v.weighttextlg = 'la mitad'
//               return v
//             }
//             if (v.weight === 1000) {
//               v.weighttextmd = '1'
//               v.weighttextlg = 'entero'
//               return v
//             }
//             return v
//           })
//         })

//       case 'UNIDADES':
//         return setAlterProduct({
//           ...alterproduct,
//           pricePerWeight: pricePerWeight.map((v) => {
//             if (v.weight === 250) {
//               v.weighttextmd = 'chico'
//               v.weighttextlg = 'pequeño'
//               return v
//             }
//             if (v.weight === 500) {
//               v.weighttextmd = 'medio'
//               v.weighttextlg = 'mediano'
//               return v
//             }
//             if (v.weight === 1000) {
//               v.weighttextmd = 'extra'
//               v.weighttextlg = 'grande'
//               return v
//             }
//             return v
//           })
//         })
//     }
//   }