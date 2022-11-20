import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="relative container mx-auto pt-6 pb-6 bg-teal-400">
        <div className="flex items-center justify-between ">
          <div className="pt-2">
            <Link to="/">
              <span className="text-2xl text-underline-none text-bold ">
                Pocket Money
              </span>
            </Link>
          </div>

          <div className="space-x-6 text-right md:flex bg-cyan-600">
            <Link to="/add-job" className="text-black-800 hover:text-black-900">
              Post A Task
            </Link>
            {/* <Link
              to="/search-job"
              className="text-gray-700 hover:text-gray-800 bg-blue"
            >
              Search A Task
            </Link> */}
          </div>

          {/* <Link to ="#" className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block">Get Started</Link> */}
        </div>
      </nav>
      <hr className="mb-4" />
    </>
  );
};

export default Header;
