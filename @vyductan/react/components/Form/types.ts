import {
  type FieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

export type FormErrors<TFieldValues extends FieldValues = FieldValues> = Array<
  FieldError & {
    field: FieldPath<TFieldValues>
  }
>

export type FormLayout = 'horizontal' | 'vertical'

export type FormItemValidateStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'validating'
export type FormItemChildProps = {
  validateStatus?: FormItemValidateStatus
}
