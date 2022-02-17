import { useState, useEffect, useRef } from "react";
import axios from "axios";
// Loaded Components
import Country from "../../components/Country";
import Graphs from "../../components/Graphs";
import Card from "../../components/Card";
import Search from "../Search";

const Main = ({ toggle }) => {
  const [country, setCountry] = useState("PH");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    allCountries: [],
    world: [],
    graphs: null,
  });

  const { allCountries, graphs, world } = data;
  const [showModal, setShowModal] = useState(false);

  //   when mounted
  const mounted = useRef();
  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!mounted.current) {
        const countries = axios.get(
          "https://corona.lmao.ninja/v2/countries?yesterday=true&sort"
        );
        const world = axios.get("https://corona.lmao.ninja/v2/all?yesterday");
        const country_graph = axios.get(
          "https://corona.lmao.ninja/v2/historical?lastdays=15"
        );
        const world_graph = axios.get(
          "https://corona.lmao.ninja/v2/historical/all"
        );

        await axios
          .all([countries, world, country_graph, world_graph])
          .then(
            axios.spread((...allData) => {
              const getAllCountries = allData[0].data;
              const getWorld = allData[1].data;
              const getCountryGraph = allData[2].data;
              const getWorldGraph = allData[3].data;

              if (!isCancelled) {
                setData({
                  allCountries: getAllCountries,
                  graphs: [getCountryGraph, getWorldGraph],
                  world: getWorld,
                });
              }
            })
          )
          .catch((err) => console.log(err.message));
        mounted.current = true;
      } else {
        if (toggle === "active") document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
      }
    };
    load();
    return () => {
      isCancelled = true;
    };
  });

  // show country data filter by iso2 base on selected item in search list
  const selectedCountry = allCountries.filter(
    (cont) => cont.countryInfo["iso2"] === country
  );

  // search country filter by search value
  const searchCountries = allCountries.filter((cont) =>
    cont.country.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      {/* Search Modal */}
      {showModal && (
        <Search
          setSearch={setSearch}
          search={search}
          setShowModal={setShowModal}
          showModal={showModal}
          setCountry={setCountry}
          searchCountries={searchCountries}
        />
      )}

      {allCountries.length > 0 ? (
        <main className={`wrapper`}>
          {/* Country Data & World Data  */}
          <Card
            header_img={require("../../assets/globe.png")}
            header_title="Coronavirus Global"
            data={world}
            grid="world"
          />
          <Card
            header_img={selectedCountry[0]["countryInfo"]["flag"]}
            header_title={selectedCountry[0]["country"]}
            data={selectedCountry[0]}
            grid="country"
          >
            <div
              className="search-icon"
              onClick={() => setShowModal(!showModal)}
            >
              <img alt="search_icon" src={require("../../assets/search.png")} />
            </div>
          </Card>
          {/* Country Map  */}
          <Country
            map={allCountries}
            country={{
              flag: selectedCountry[0]["countryInfo"]["flag"],
              name: selectedCountry[0]["country"],
              population: selectedCountry[0]["population"],
              lat: selectedCountry[0]["countryInfo"]["lat"],
              long: selectedCountry[0]["countryInfo"]["long"],
            }}
          />
          {/* Graph Data both country & world  */}
          <section className="card graph-section">
            <div className="card-header">
              <div>
                <img
                  alt="graph_icon"
                  src={require("../../assets/graphs.png")}
                />
                <p className="card-header-title">Graphs</p>
              </div>
              <p>Past 15 days</p>
            </div>
            <div className="card-body">
              {graphs && (
                <Graphs
                  data={graphs}
                  flag={selectedCountry[0]["countryInfo"]["flag"]}
                  name={selectedCountry[0]["country"]}
                />
              )}
            </div>
          </section>
        </main>
      ) : (
        <div className="loading">
          <img alt="loading_icon" src={require("../../assets/rolling.gif")} />
        </div>
      )}
    </>
  );
};
export default Main;
