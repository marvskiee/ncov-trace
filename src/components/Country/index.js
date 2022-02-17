import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Maps from "./components/Maps";
import { numberWithCommas } from "../Home/components/NumberFormat";
export default function Country({ map, country }) {
  const [content, setContent] = useState("");
  const { lat, long, population, name, flag } = country;
  return (
    <>
      <section className="card map-section">
        <div className="card-header">
          <div>
            <img alt="flag_icon" src={flag} />
            <div>
              <p style={{ textOverflow: "ellipsis", wrap: "" }}>
                <span className="card-title">Country:</span>
                <br />
                {name}
              </p>
            </div>
          </div>
          <div>
            <p>
              <span className="card-title">Population:</span>
              <br />
              {numberWithCommas(population)}
            </p>
          </div>
        </div>
        <div className="country-map">
          <ReactTooltip html={true}>{content}</ReactTooltip>
          <Maps
            setTooltipContent={setContent}
            maps={map}
            name={name}
            lat={lat}
            long={long}
          />
        </div>
      </section>
    </>
  );
}
