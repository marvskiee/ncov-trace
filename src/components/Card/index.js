import React from "react";
import CardItems from "./components/CardItems";
import { numberWithCommas } from "../Home/components/NumberFormat";
function Card({ header_img, header_title, children, data, grid }) {
  const {
    cases,
    recovered,
    deaths,
    critical,
    active,
    todayCases,
    todayDeaths,
    todayRecovered,
  } = data;
  return (
    <section className={`card ${grid}`}>
      <div className="card-header">
        <div>
          <img alt="card_icon" src={header_img} />
          <p className="card-header-title">{header_title}</p>
        </div>
        {children}
      </div>
      <div className="card-body">
        <p className="card-title">Today</p>
        <div className="card-section">
          <table>
            <tbody>
              <CardItems
                cases={todayCases}
                deaths={todayDeaths}
                recovered={todayRecovered}
              />
            </tbody>
          </table>
        </div>
        <p className="card-title">Overall</p>
        <div className="card-section">
          <table>
            <tbody>
              <CardItems cases={cases} deaths={deaths} recovered={recovered} />
              <tr>
                <td>Active: </td>
                <td>{numberWithCommas(active)}</td>
              </tr>
              <tr>
                <td>Critical: </td>
                <td>{numberWithCommas(critical)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Card;
