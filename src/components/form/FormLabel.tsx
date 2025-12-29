interface FormLabelProps {
  id?: string
  title?: string
  required?: boolean
}

const FormLabel = ({ id = "label-id", title = "Label", required = true }: FormLabelProps) => {
  return (
    <label htmlFor={id} className="text-left block text-gray-700">
      {title} {required && <small className="text-red-800">*</small>}
    </label>
  )
}

export default FormLabel
