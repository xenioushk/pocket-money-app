interface FormHeadingProps {
  title: string
}

const FormHeading = ({ title }: FormHeadingProps) => {
  return <h2 className="col-span-10 text-center text-2xl underline mb-3">{title}</h2>
}

export default FormHeading
