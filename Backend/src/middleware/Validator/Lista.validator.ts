import { z } from "zod";

export class ListaValidar {
	registro = () => z.object({
		body: z.object({
			nombre: z
				.string()
				.min(3, 'Se acepta 3 carácteres minimo')
				.max(30, 'Exediste los 30 carácteres'),
			usuario: z
				.object({_id: z.string().length(24, 'los mongo id tienen 24 carácteres').trim()}),
			itemsLista: z
				.array(z.object({
					cantidades: z.array(z.object({
						peso:z.number(),
						precio:z.number(),
						cantidad:z.number(),
						_id: z.string().length(24, 'los mongo id tienen 24 carácteres'),
					})).nonempty(),
					producto: z.string().length(24, 'los mongo id tienen 24 carácteres')
				}))
				.optional(),
		})
	})
} 
