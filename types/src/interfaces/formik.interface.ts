import { FormikErrors, FormikTouched } from "formik"

export interface FormikProps <T> {
  errors: FormikErrors<T>
  touched: FormikTouched<T>
  isSubmitting: boolean
  submitForm: (() => Promise<void>) & (() => Promise<T>)
}
