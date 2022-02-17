import React from "react";
import ChartData from "./components";

const filter = (value) => {
  let arr = Object.values(value);
  let keys = Object.keys(value);

  let temp = {};
  let i = 0;
  try {
    while (i < arr.length) {
      if (i !== 0) {
        let val = arr[i] - arr[i - 1];
        temp[keys[i]] = val;
      }
      i += 1;
    }
  } catch (e) {
    console.log(e.message);
  }
  return temp;
};
export default function Graphs({ flag, name, data }) {
  const country = data[0];

  const world = data[1];
  const selected = country.filter((cont) => cont.country.includes(name));

  const country_data =
    selected[0] !== undefined
      ? [
          {
            label: "Cases",
            data: filter(selected[0]["timeline"]["cases"]),
          },
          {
            label: "Deaths",
            data: filter(selected[0]["timeline"]["deaths"]),
          },
        ]
      : [];
  const world_data = [
    {
      label: "Cases",
      data: filter(
        Object.fromEntries(Object.entries(world["cases"]).slice(0, 15))
      ),
    },
    {
      label: "Deaths",
      data: filter(
        Object.fromEntries(Object.entries(world["deaths"]).slice(0, 15))
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="card-sub-header">
          <img src={flag} />
          <p className="card-title">{name}</p>
        </div>
        <div className="card-items">
          {country_data.length > 0 ? (
            country_data.map((d, index) => (
              <div className="card-graph" key={index}>
                <ChartData
                  key={index}
                  label={d.label}
                  data={d.data}
                  min={d.min}
                  max={d.max}
                />
              </div>
            ))
          ) : (
            <p className="error-graphs">Can't Load Graphs</p>
          )}
        </div>
      </div>
      <div>
        <div className="card-sub-header">
          <img src={require("../../assets/globe.png")} />
          <p className="card-title">Global</p>
        </div>
        <div className="card-items">
          {world_data &&
            world_data.map((d, index) => (
              <div className="card-graph" key={index}>
                <ChartData
                  key={index}
                  label={d.label}
                  data={d.data}
                  min={d.min}
                  max={d.max}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
