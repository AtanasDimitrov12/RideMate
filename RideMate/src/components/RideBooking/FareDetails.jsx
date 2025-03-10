import React from "react";

const FareDetails = ({ fare, duration }) => {
  return (
    <>
      <p className="mt-4">
        <strong>Estimated fare:</strong> €{fare}
      </p>
      <p>
        <strong>Estimated time:</strong> {duration} mins
      </p>
    </>
  );
};

export default FareDetails;
