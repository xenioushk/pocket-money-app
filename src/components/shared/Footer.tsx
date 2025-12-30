import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <div className="container flex flex-col-reverse items-center justify-between mx-auto md:flex-row py-8 px-4">
          <div className="text-left md:w-1/2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Copyright &copy; 2023-2026. All Rights Reserved.</p>
          </div>
          <div className="space-x-6 mb-3 md:w-1/2 text-right">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-Green-500 dark:hover:text-Green-400 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/about-us" className="text-gray-700 dark:text-gray-300 hover:text-Green-500 dark:hover:text-Green-400 transition-colors duration-200 font-medium">
              About Us
            </Link>
            <Link to="/terms" className="text-gray-700 dark:text-gray-300 hover:text-Green-500 dark:hover:text-Green-400 transition-colors duration-200 font-medium">
              Terms
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
