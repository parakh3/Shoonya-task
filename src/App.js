import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { formatUnixTimestamp } from "./Components/utils/globleData";
import debounce from "lodash/debounce";
import List from "./Components/List";
import ContentLoader from "./Components/globleComponents/ContentLoader";

function App() {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchRetreatsDebounced = debounce(fetchRetreats, 1000);
    fetchRetreatsDebounced();
    return () => {
      fetchRetreatsDebounced.cancel();
    };
  }, [currentPage, debouncedSearchQuery, selectedType]);

  const fetchRetreats = async () => {
    setLoading(true);
    let apiUrl =
      await `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${currentPage}&limit=${limit}`;

    if (debouncedSearchQuery) {
      apiUrl += `&search=${debouncedSearchQuery}`;
    }

    if (selectedType) {
      apiUrl += `&filter=${selectedType}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setRetreats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setDebouncedSearchQuery(value);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="ml-3 p-2">
          <h3>Wellness Retreats</h3>
        </div>
      </div>
      <div className="main-card p-4 pb-0">
        {loading ? (
          <ContentLoader />
        ) : (
          <>
            {retreats.length > 0 && (
              <div className="card h-100 shadow-sm">
                <img
                  src={retreats[0].image}
                  className="card-img-top"
                  alt={retreats[0].title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{retreats[0].title}</h5>
                  <p className="card-text flex-grow-1">
                    {retreats[0].description}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {formatUnixTimestamp(retreats[0].date)}
                    </small>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <div className="d-flex flex-wrap mb-4">
          <div className="dropdown col-md-2 col-sm-12 mb-2 mb-sm-0">
            <button
              className="btn btn-primary dropdown-toggle w-100"
              type="button"
              id="dropdownMenuButton1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Date <i className="bi bi-caret-down"></i>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton1"
            >
              <a className="dropdown-item">Filter by Date</a>
              <a className="dropdown-item">2022 - 2023</a>
              <a className="dropdown-item">2024 - 2025</a>
            </div>
          </div>

          <div className="dropdown col-md-2 col-sm-12 mb-2 mb-sm-0">
            <button
              className="btn btn-primary dropdown-toggle w-100"
              type="button"
              id="dropdownMenuButton2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Type <i className="bi bi-caret-down"></i>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton2"
            >
              <a className="dropdown-item" onClick={() => handleTypeFilter("")}>
                All
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleTypeFilter("Yoga")}
              >
                Yoga
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleTypeFilter("Meditation")}
              >
                Meditation
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleTypeFilter("Detox")}
              >
                Detox
              </a>
            </div>
          </div>

          <div className="input-group col-md-4 col-sm-12 ml-auto">
            <input
              type="text"
              className="form-control form-control-primary custom-input"
              placeholder="Search Retreats by titles"
              aria-label="Search titles"
              aria-describedby="button-addon2"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <List
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          retreats={retreats}
          formatUnixTimestamp={formatUnixTimestamp}
        />
        <div className="d-flex justify-content-center">
          <p className="text-center">
            &#169; 2024 Wellness Retreats. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
