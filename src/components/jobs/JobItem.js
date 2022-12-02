import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const JobItem = (props) => {
  const [showContact, setshowContact] = useState(false);

  const showContactDetails = (e) => {
    setshowContact(!showContact);
  };

  return (
    <div
      className="bg-Gray-300 space-y-2 border-2 border-bg-Gray-300 mb-4 p-2 md:p-8 mb-0"
      key={props.job.id}
    >
      <h2 className="text-2xl font-bold mb-3">
        {!props.single ? (
          <Link
            to={`/job/${props.job.uuid}`}
            className="transition text-Green-900 hover:text-black"
          >
            {props.job.title}
          </Link>
        ) : (
          <>{props.job.title}</>
        )}
      </h2>

      {!props.single ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-y-2 gap-x-1 md:grid-cols-2 ">
              <p>Day: {props.job.date}</p>
              <p>Location: {props.job.city}</p>
              <p>
                Duration: {props.job.duration} hour
                {props.job.duration > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-3 py-3 font-normal place-self-center rounded bg-Gray-500 md: text-2xl font-bold ">
              {props.job.price ? props.job.price : 0} &euro;
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <div
                className={!props.single ? "hidden md:block" : "block"}
                dangerouslySetInnerHTML={{ __html: props.job.excerpt }}
              />
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-y-2 gap-x-1">
                <p>Day: {props.job.date}</p>
                <p>Location: {props.job.city}</p>
                <p>
                  Duration: {props.job.duration} hour
                  {props.job.duration > 1 ? "s" : ""}
                </p>
                <p>Category: {props.job.category}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-3 place-self-center font-bold rounded bg-Gray-500 text-2xl">
                {props.job.price ? props.job.price : 0} &euro;
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="inline-block px-4 py-2 bg-Green-500 text-white hover:bg-Green-900 text-black mt-6"
              onClick={showContactDetails}
            >
              Contact Details
            </button>
          </div>

          {showContact ? (
            <>
              <h3 className="text-3xl border block border-0 border-b-2 pb-2">
                Contact Details:
              </h3>

              <p className="mb-6">
                <strong>Posted By:</strong> {props.job.first_name}{" "}
                {props.job.last_name}
              </p>
              <p className="mb-6">
                <strong>Email:</strong> {props.job.email}
              </p>
              <p className="mb-6">
                <strong>Phone:</strong> {props.job.contact}
              </p>
              <p className="mb-6">
                <strong>Location:</strong> {props.job.city}
              </p>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

// Default Value
JobItem.defaultProps = {
  single: false,
};

// Type Casing.
JobItem.propTypes = {
  single: PropTypes.bool,
};

export default JobItem;
