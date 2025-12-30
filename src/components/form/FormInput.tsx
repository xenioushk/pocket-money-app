interface FormInputProps {
  label: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange, placeholder = "", required = false, className = "" }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className={`w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white ${className}`} />
    </div>
  )
}

export default FormInput
