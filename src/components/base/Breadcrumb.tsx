import { Link } from "react-router-dom"

interface BreadcrumbProps {
  title?: string
  category?: string
  catSlug?: string
}

const Breadcrumb = ({ title, category, catSlug }: BreadcrumbProps) => {
  return (
    <nav className="bg-Gray-100 space-y-2 border-1 border-bg-Gray-100 px-5 py-3 w-full mt-2 mb-2">
      <ol className="list-reset text-sm font-normal md:font-bold md:font-bold flex">
        <li>
          <Link to={"/"} className="text-Green-900 hover:text-gray-500">
            Home
          </Link>
        </li>

        {category && (
          <>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>
            <li>
              <Link to={`/category/${catSlug}`} className="text-Green-900 hover:text-gray-500">
                {category}
              </Link>
            </li>
          </>
        )}

        {title && (
          <>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>
            <li className="text-gray-900 font-normal">{title}</li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
