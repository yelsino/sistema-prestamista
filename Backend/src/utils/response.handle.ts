import { Response } from "express";

// no se puede convertir atributos por que socket consulta difectamente al servicio
export const responder = (resultado: any, res: Response) => {

	// const resultadoString = JSON
	// 	.stringify(resultado)
	// 	.replace("createdAt", "creacion")
	// 	.replace("updatedAt", "modificacion");
		
	// const resultadoParseado = JSON.parse(resultadoString);

	if(!resultado.ok){
	  return res.status(resultado.code).send(resultado)
	}

	return res.send(resultado);
  }

