import React, { memo, useEffect, useState, useRef } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { numberWithCommas } from "../../Home/components/NumberFormat";
import axios from "axios";

const colorScale = scaleLinear()
  .domain([0, 10000000])
  .range(["#FFE9E6", "#FF2B2A"]);
const CountryMap = ({ setTooltipContent, maps, lat, long, name }) => {
  const [geoUrl, setGeoUrl] = useState();
  const mounted = useRef();
  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!mounted.current) {
        axios
          .get(
            "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
          )
          .then((res) => {
            if (!isCancelled) {
              setGeoUrl(res.data);
            }
          });
        mounted.current = true;
      }
    };
    load();
    return () => {
      isCancelled = true;
    };
  });
  const markers = [
    {
      markerOffset: -30,
      name,
      coordinates: [long, lat],
    },
  ];
  const data = maps;
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 300 }} height={400}>
        <ZoomableGroup center={[long, lat]}>
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                const iso3 = data.map(({ countryInfo }) => countryInfo["iso3"]);
                return geographies.map((geo, index) => {
                  const d = iso3.includes(geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        d
                          ? colorScale(parseInt(data[index]["cases"]))
                          : "#F5F4F6"
                      }
                      onMouseEnter={() => {
                        const { ISO_A3 } = geo.properties;
                        try {
                          let hover_data = data.filter(
                            (cont) => cont.countryInfo["iso3"] === ISO_A3
                          );
                          const { country, population, cases, deaths } =
                            hover_data[0];
                          setTooltipContent(
                            `${country}<br/> 
                            Population: ${numberWithCommas(population)}<br/>
                            Cases: ${numberWithCommas(cases)}<br/>
                            Deaths: ${numberWithCommas(deaths)}`
                          );
                        } catch (e) {
                          console.log(e.message);
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          )}
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(CountryMap);
