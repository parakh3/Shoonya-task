import React from "react";
import ContentLoader from "./globleComponents/ContentLoader";

const List = (props) => {
  const {
    retreats,
    formatUnixTimestamp,
    currentPage,
    loading,
    setCurrentPage,
  } = props;
  const isLastPage = retreats.length < 3;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <>
      {loading ? (
        <ContentLoader />
      ) : (
        <div className="row">
          {retreats.map((retreat, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="image">
                  <img
                    src={retreat.image}
                    className="card-img-list"
                    alt={retreat.title}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{retreat.title}</h5>
                  <p className="card-text flex-grow-1 mb-0">
                    <small className="text-muted">{retreat.description}</small>
                  </p>
                  <p className="card-text mb-0">
                    <small className="text-muted">
                      Date: {formatUnixTimestamp(retreat?.date)}
                    </small>
                  </p>
                  <p className="card-text mb-0">
                    <small className="text-muted">
                      Location: {retreat.location}
                    </small>
                  </p>
                  <p className="card-text mb-0">
                    <small className="text-muted">Price: {retreat.price}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center mb-4">
        <div className="">
          <button
            className="btn btn-primary mx-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1 ? true : false}
          >
            Previous
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleNextPage}
            disabled={isLastPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
