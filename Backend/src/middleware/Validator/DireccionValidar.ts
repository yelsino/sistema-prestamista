import { z } from "zod";

export class DireccionValidar {
	registro = () => z.object({
		body: z.object({
			usuario: z.string().length(24, 'los mongo id tienen 24 carácteres'),
			nombre: z.string().min(3, 'Se acepta 3 carácteres minimo').max(50, 'Exediste los 50 carácteres'),
			referencia: z.string().min(3, 'Se acepta 3 carácteres minimo').max(100, 'Exediste los 100 carácteres'),
		})
	})
} 
