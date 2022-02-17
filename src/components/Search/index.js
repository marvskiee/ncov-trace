import React from "react";

function Search({
  setSearch,
  search,
  setShowModal,
  showModal,
  setCountry,
  searchCountries,
}) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <input
            type="text"
            placeholder="Search Country"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <img
            alt="close_icon"
            src={require("../../assets/close.png")}
            onClick={() => setShowModal(!showModal)}
          />
        </div>
        <div className="modal-body">
          {searchCountries &&
            searchCountries.map(({ country, countryInfo }, index) => (
              <div
                className="search-item"
                key={index}
                onClick={() => {
                  setCountry(countryInfo["iso2"]);
                  setShowModal(!showModal);
                }}
              >
                <img src={countryInfo["flag"]} alt="flag" />
                <p>{country}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
