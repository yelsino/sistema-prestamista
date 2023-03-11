import { Field, FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { IAuth } from 'types-prestamista/dist/interfaces/usuario.interface'

export type QueHacer = 'REGISTRARSE' | 'INICIAR_SESION'

interface Props extends FormikProps<IAuth> {
  quehacer: QueHacer
}

export const Correo = (props:Props) => {
  const { errors, touched, isSubmitting, quehacer } = props

  return (
      <>
        {/* correo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex gap-x-1 ">
            <label htmlFor="password" className="text-gray-500">
              Usuario
            </label>
            {errors.nombreUsuario && touched.nombreUsuario
              ? (
              <div className="text-rose-400">{errors.nombreUsuario}</div>
                )
              : null}
          </div>
          <div className="flex gap-x-10 select-none">
            <Field
              autoComplete="off"
              className="w-full rounded-md bg-color_green_2 p-4 text-color_green_7 focus:outline-secundario_900"
              name="nombreUsuario"
              id="nombreUsuario"
            />
          </div>
        </motion.div>

        {/* password */}

        <div>
          <div className="flex gap-x-1">
            <label htmlFor="password" className="text-gray-500">
              Contraseña
            </label>
            {errors.password && touched.password
              ? (
              <div className="text-rose-400">{errors.password}</div>
                )
              : null}
          </div>
          <div className="flex gap-x-10 select-none">
            <Field
              autoComplete="new-password"
              className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none "
              name="password"
              id="password"
              type="password"
              autoFocus={false}
            />
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white select-none"
        >
          {quehacer === 'INICIAR_SESION'
            ? isSubmitting
              ? 'INICIANDO...'
              : 'INICIAR'
            : isSubmitting
              ? 'REGISTRANDOSE...'
              : 'REGISTRARSE'}
        </button>
      </>
  )
}
