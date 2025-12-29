type AlertType = "secondary" | "success" | "danger" | "warning"

interface AlertMessageProps {
  type?: AlertType
  title: string
}

const AlertMessage = ({ type = "success", title }: AlertMessageProps) => {
  const getAlertClass = (alertType: AlertType): string => {
    const baseClasses = "rounded-lg py-5 px-6 mb-4 text-base mb-3"

    switch (alertType) {
      case "secondary":
        return `bg-purple-100 text-purple-700 ${baseClasses}`
      case "success":
        return `bg-blue-100 text-blue-700 ${baseClasses}`
      case "danger":
        return `bg-red-100 text-red-700 ${baseClasses}`
      case "warning":
        return `bg-yellow-100 text-yellow-700 ${baseClasses}`
      default:
        return `bg-blue-100 text-blue-700 ${baseClasses}`
    }
  }

  return (
    <div className={getAlertClass(type)} role="alert">
      {title}
    </div>
  )
}

export default AlertMessage
