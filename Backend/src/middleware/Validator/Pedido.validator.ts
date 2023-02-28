import { z } from "zod";

export class PedidoValidar {
	registro = () => z.object({
		body: z.object({
			// codigo: z
			// 	.string()
			// 	.optional(),
			direccion: z
				.string()
				.length(24, 'los mongo id tienen 24 carácteres'),
			// fechaEntrega: z
			// 	.date()
			// 	.optional(),
			estado: z
				.string()
				.optional(),
			lista: z
				.string()
				.length(24, 'los mongo id tienen 24 carácteres'),
			// numero: z
			// 	.number()
			// 	.optional(),
			// porcentajeDescuento: z
			// 	.number()
			// 	.optional(),
			// montoDescuento: z
			// 	.number()
			// 	.optional(),
			// subTotal: z
			// 	.number()
			// 	.optional(),
			// total: z
			// 	.number()
			// 	.optional(),
			usuario: z
				.string()
				.length(24, 'los mongo id tienen 24 carácteres'),
				
		})
	})

	registroReclamo = () => z.object({
		body: z.object({
			asunto: z
				.string()
				.optional(),
			descripcion: z
				.string()
				.optional(),
			evidencias: z
				.array(z.string())
				.optional(),
			pedido: z
				.string()
				.length(24, 'los mongo id tienen 24 carácteres'),
			usuario: z
				.string()
				.length(24, 'los mongo id tienen 24 carácteres'),
		})
	})

} 
